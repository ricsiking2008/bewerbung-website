import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { createReadStream, existsSync, promises as fs } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const scrypt = promisify(scryptCallback);
const root = process.cwd();
const usersPath = join(root, "data", "users.json");
const documentsPath = join(root, "private-documents");
const production = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 3001);

const sessions = new Map();
const loginAttempts = new Map();
const SESSION_TTL = 1000 * 60 * 60 * 8;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW = 1000 * 60 * 15;
const MIME_TYPES = {
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function addSecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");
}

function sendJson(response, status, body) {
  addSecurityHeaders(response);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(body));
}

function parseCookies(request) {
  return Object.fromEntries(
    (request.headers.cookie || "").split(";").filter(Boolean).map((item) => {
      const index = item.indexOf("=");
      return [item.slice(0, index).trim(), decodeURIComponent(item.slice(index + 1))];
    }),
  );
}

function setSessionCookie(response, token) {
  const secure = production ? "; Secure" : "";
  response.setHeader("Set-Cookie", `session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL / 1000}${secure}`);
}

function clearSessionCookie(response) {
  response.setHeader("Set-Cookie", "session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0");
}

function getClientIp(request) {
  return request.socket.remoteAddress || "unknown";
}

function canAttemptLogin(ip) {
  const entry = loginAttempts.get(ip);
  if (!entry || Date.now() - entry.firstAttempt > LOGIN_WINDOW) return true;
  return entry.count < MAX_LOGIN_ATTEMPTS;
}

function recordFailedLogin(ip) {
  const entry = loginAttempts.get(ip);
  if (!entry || Date.now() - entry.firstAttempt > LOGIN_WINDOW) {
    loginAttempts.set(ip, { count: 1, firstAttempt: Date.now() });
  } else {
    entry.count += 1;
  }
}

function clearFailedLogins(ip) {
  loginAttempts.delete(ip);
}

async function readJson(request) {
  let raw = "";
  for await (const chunk of request) {
    raw += chunk;
    if (raw.length > 10_000) throw new Error("Anfrage ist zu gross.");
  }
  return JSON.parse(raw || "{}");
}

async function getUsers() {
  try {
    return JSON.parse(await fs.readFile(usersPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function passwordMatches(password, user) {
  const derived = await scrypt(password, Buffer.from(user.salt, "hex"), 64);
  return timingSafeEqual(derived, Buffer.from(user.passwordHash, "hex"));
}

function currentSession(request) {
  const token = parseCookies(request).session;
  const session = token && sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (token) sessions.delete(token);
    return null;
  }
  return { token, ...session };
}

function requireSameOrigin(request, response) {
  const origin = request.headers.origin;
  if (origin && origin !== `http://${request.headers.host}` && origin !== "http://127.0.0.1:5173") {
    sendJson(response, 403, { error: "Ungültige Anfrage." });
    return false;
  }
  return true;
}

async function handleLogin(request, response) {
  const ip = getClientIp(request);
  if (!canAttemptLogin(ip)) return sendJson(response, 429, { error: "Zu viele Versuche. Bitte warte 15 Minuten." });
  if (!requireSameOrigin(request, response)) return;

  try {
    const { email, password } = await readJson(request);
    if (typeof email !== "string" || typeof password !== "string" || password.length > 200) {
      return sendJson(response, 400, { error: "Bitte E-Mail und Passwort eingeben." });
    }
    const user = (await getUsers()).find((item) => item.email === email.trim().toLowerCase());
    if (!user || !(await passwordMatches(password, user))) {
      recordFailedLogin(ip);
      return sendJson(response, 401, { error: "E-Mail oder Passwort ist nicht korrekt." });
    }
    clearFailedLogins(ip);
    const token = randomBytes(32).toString("hex");
    sessions.set(token, { user: { company: user.company, email: user.email }, expiresAt: Date.now() + SESSION_TTL });
    setSessionCookie(response, token);
    sendJson(response, 200, { user: { company: user.company } });
  } catch {
    sendJson(response, 400, { error: "Die Anfrage konnte nicht verarbeitet werden." });
  }
}

async function serveDocument(request, response, fileName, download = false) {
  if (!currentSession(request)) return sendJson(response, 401, { error: "Bitte zuerst einloggen." });
  const safeName = normalize(fileName).replace(/^([\\/])+/, "");
  const fullPath = resolve(documentsPath, safeName);
  if (!fullPath.startsWith(resolve(documentsPath) + "\\") || !existsSync(fullPath)) {
    return sendJson(response, 404, { error: "Dokument nicht gefunden." });
  }
  addSecurityHeaders(response);
  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extname(fullPath).toLowerCase()] || "application/octet-stream",
    "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${safeName.replace(/[^a-zA-Z0-9._-]/g, "_")}"`,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  });
  createReadStream(fullPath).pipe(response);
}

async function serveApp(response, pathname) {
  const distPath = join(root, "dist");
  const requested = pathname === "/" ? "index.html" : pathname.slice(1);
  const candidate = resolve(distPath, requested);
  const isAsset = requested.startsWith("assets/");
  const filePath = candidate.startsWith(resolve(distPath) + "\\") && existsSync(candidate)
    ? candidate
    : !isAsset ? join(distPath, "index.html") : null;

  if (!filePath || !existsSync(filePath)) {
    return sendJson(response, 404, { error: "Frontend nicht gefunden. Bitte zuerst npm run build ausführen." });
  }
  addSecurityHeaders(response);
  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": filePath.endsWith("index.html") ? "no-cache" : "public, max-age=31536000, immutable",
  });
  createReadStream(filePath).pipe(response);
}

async function handleApi(request, response, url) {
  if (request.method === "POST" && url.pathname === "/api/login") return handleLogin(request, response);
  if (request.method === "POST" && url.pathname === "/api/logout") {
    if (!requireSameOrigin(request, response)) return;
    const session = currentSession(request);
    if (session) sessions.delete(session.token);
    clearSessionCookie(response);
    return sendJson(response, 200, { ok: true });
  }
  if (request.method === "GET" && url.pathname === "/api/me") {
    const session = currentSession(request);
    return sendJson(response, 200, { user: session?.user || null });
  }
  if (request.method === "GET" && url.pathname === "/api/documents") {
    if (!currentSession(request)) return sendJson(response, 401, { error: "Bitte zuerst einloggen." });
    const files = existsSync(documentsPath) ? (await fs.readdir(documentsPath)).filter((file) => MIME_TYPES[extname(file).toLowerCase()]) : [];
    return sendJson(response, 200, { files });
  }
  if (request.method === "GET" && url.pathname.startsWith("/api/documents/")) {
    return serveDocument(request, response, decodeURIComponent(url.pathname.slice("/api/documents/".length)), url.searchParams.get("download") === "1");
  }
  return sendJson(response, 404, { error: "API-Endpunkt nicht gefunden." });
}

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  try {
    if (url.pathname.startsWith("/api/")) return await handleApi(request, response, url);
    if (production) return await serveApp(response, url.pathname);
    sendJson(response, 404, { error: "Frontend wird im Entwicklungsmodus über Vite ausgeliefert." });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Interner Serverfehler." });
  }
}).listen(port, production ? "0.0.0.0" : "127.0.0.1", () => {
  console.log(`Backend läuft auf http://127.0.0.1:${port}`);
});
