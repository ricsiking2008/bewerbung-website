import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";

const scrypt = promisify(scryptCallback);
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (label) => rl.question(label);

try {
  const company = (await ask("Firmenname: ")).trim();
  const email = (await ask("Login-E-Mail: ")).trim().toLowerCase();
  const password = await ask("Temporäres Passwort (mindestens 12 Zeichen): ");
  if (!company || !/^\S+@\S+\.\S+$/.test(email) || password.length < 12) {
    throw new Error("Firmenname, gültige E-Mail und ein Passwort mit mindestens 12 Zeichen sind erforderlich.");
  }
  const file = join(process.cwd(), "data", "users.json");
  await fs.mkdir(join(process.cwd(), "data"), { recursive: true });
  let users = [];
  try { users = JSON.parse(await fs.readFile(file, "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
  if (users.some((user) => user.email === email)) throw new Error("Für diese E-Mail existiert bereits ein Login.");
  const salt = randomBytes(16);
  const passwordHash = await scrypt(password, salt, 64);
  users.push({ company, email, salt: salt.toString("hex"), passwordHash: passwordHash.toString("hex"), createdAt: new Date().toISOString() });
  await fs.writeFile(file, `${JSON.stringify(users, null, 2)}\n`, { mode: 0o600 });
  console.log(`Login für ${company} wurde erstellt.`);
} catch (error) {
  console.error(`Fehler: ${error.message}`);
  process.exitCode = 1;
} finally {
  rl.close();
}
