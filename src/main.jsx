import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import logoUrl from "./assets/logo_homepage-refined.png";
import aboutImageUrl from "./assets/me.jpeg";
import programmingImageUrl from "./assets/programmieren.jpeg";
import motorcycleImageUrl from "./assets/motorrad.jpeg";
import scoutsImageUrl from "./assets/pfadi.jpeg";
import boardgamesImageUrl from "./assets/boardgames.jpeg";
import snowboardingImageUrl from "./assets/snowboard.jpeg";
import chessImageUrl from "./assets/chess.png";
import jumpAndRunImageUrl from "./assets/jump_and_run.png";
import classPageImageUrl from "./assets/klassenseite.png";
import vendoSwissImageUrl from "./assets/vendoswiss.png";
import stahlpartnerImageUrl from "./assets/stahlpartner.png";
import swissactiveImageUrl from "./assets/swissactive.png";
import tuneGuessVideoUrl from "./assets/TuneGuess.mp4";
import healthClockVideoUrl from "./assets/smartwatch_video.mp4";
import prebloxImageUrl from "./assets/preblox.png";
import "./styles.css";

const profile = {
  name: "Richard Eberhardt",
  role: "Informatiker EFZ in Ausbildung",
  location: "Schweiz",
  email: "ricsieber@gmail.com",
  intro:
    "Die Informatik begeistert mich, weil es fast immer mehr als nur eine richtige Lösung gibt. Genau dieses kreative Denken, das Ausprobieren und das kontinuierliche Lernen motivieren mich jeden Tag.",
};

const skills = [
  {
    name: "React",
    label: "Frontend",
    text: "Komponenten, States und saubere Interfaces.",
    accent: "#7dd3fc",
  },
  {
    name: "JavaScript",
    label: "Logic",
    text: "Interaktive Funktionen und verständlicher Code.",
    accent: "#facc15",
  },
  {
    name: "UI Design",
    label: "Design",
    text: "Ruhige Layouts, klare Abstände und gute Lesbarkeit.",
    accent: "#fb7185",
  },
  {
    name: "Backend Basics",
    label: "Auth",
    text: "Login, geschützte Bereiche und Datenstrukturen.",
    accent: "#34d399",
  },
];

const pages = {
  "/projects": {
    title: "Projekte",
    accent: "#7dd3fc",
    pattern: "grid",
  },
  "/about": {
    title: "Über mich",
    accent: "#fb7185",
    pattern: "orbit",
  },
  "/hobbies": {
    title: "Hobbys",
    accent: "#34d399",
    pattern: "waves",
  },
  "/documents": {
    eyebrow: "Private area",
    title: "Bewerbungsunterlagen",
    accent: "#facc15",
    pattern: "locked",
    locked: true,
  },
  "/login": {
    eyebrow: "Access",
    title: "Login",
    accent: "#c084fc",
    pattern: "portal",
  },
};

const pageDetails = {
  "/projects": [
    {
      kicker: "Auswahl",
      title: "Websites, kleine Tools und Experimente",
      text: "Hier kann später jedes Projekt in einem eigenen Feld wachsen: kurze Idee, genutzte Technik und ein Link zum Resultat.",
    },
    {
      kicker: "Arbeitsweise",
      title: "Von der Skizze bis zum funktionierenden Prototyp",
      text: "Ich mag Projekte, bei denen man schnell etwas sieht, dann gezielt verbessert und dabei sauber bleibt.",
    },
    {
      kicker: "Nächster Schritt",
      title: "Mehr echte Cases und kleine Demos",
      text: "Dieser Bereich ist vorbereitet, damit neue Arbeiten direkt als scrollbare Detailkarten ergänzt werden können.",
    },
  ],
  "/about": [
    {
      kicker: "Profil",
      title: "Ich lerne gern, wenn Theorie praktisch wird.",
      text: "Mich motiviert, wenn aus einer Idee ein Interface entsteht, das sich klar anfühlt und wirklich benutzt werden kann.",
    },
  ],
  "/hobbies": [
    {
      kicker: "Code",
      title: "Programmieren",
      text: "Programmieren macht mir Spass, weil ich aus einer Idee etwas Eigenes entwickeln kann. Ich finde es spannend, Lösungen für Probleme zu suchen und Schritt für Schritt herauszufinden, wie etwas funktioniert. Es motiviert mich besonders, zu sehen, wie aus einer Idee durch meinen Code ein funktionierendes Projekt wird.",
    },
    {
      kicker: "Ride",
      title: "Motorradfahren",
      text: "Beim Motorradfahren kann ich den Alltag hinter mir lassen. Es verlangt Konzentration, schnelles Reagieren und Verantwortungsbewusstsein. Genau diese Mischung aus Herausforderung und Freiheit macht für mich jede Fahrt besonders.",
    },
    {
      kicker: "Outdoor",
      title: "Pfadi",
      text: "Die Pfadi ist für mich ein Ort, an dem man viel zusammen erlebt und dabei auch Verantwortung übernimmt. Ich mag es, draussen unterwegs zu sein, Dinge als Gruppe zu planen und gemeinsam Lösungen zu finden. Man lernt dort, aufeinander zu achten, mit anzupacken und auch in stressigen Momenten ruhig zu bleiben.",
    },
    {
      kicker: "Spielen",
      title: "Brettspiele",
      text: "Brettspiele gehören seit meiner Kindheit zu meinen Hobbys. Besonders mag ich strategische und anspruchsvolle Spiele, die zum Nachdenken anregen. In meiner Familie ist das Spielen eine Tradition. Dabei geht es mir nicht nur ums Spielen selbst, sondern auch darum, zu gewinnen und vor allem wertvolle Zeit mit meiner Familie zu verbringen.",
    },
    {
      kicker: "Winter",
      title: "Snowboarding",
      text: "Snowboarden bedeutet für mich Freiheit und Spass in den Bergen. Ich bin gerne draussen und geniesse es, gemeinsam mit meiner Familie und meinen Freunden unterwegs zu sein. Neben dem Sport schätze ich vor allem die gemeinsame Zeit und die besonderen Erlebnisse auf der Piste.",
    },
  ],
  "/documents": [
    {
      kicker: "Geschützt",
      title: "Dokumente bleiben bewusst privat",
      text: "Dieser Bereich kann später Bewerbungsunterlagen, Zeugnisse oder Downloads enthalten.",
    },
    {
      kicker: "Zugriff",
      title: "Nur mit Login sichtbar",
      text: "Die visuelle Vorschau zeigt den Bereich, der Inhalt kann anschliessend an echte Authentifizierung gekoppelt werden.",
    },
    {
      kicker: "Ordnung",
      title: "Ein klarer Ort für wichtige Dateien",
      text: "So bleibt die öffentliche Seite schlank, während vertrauliche Inhalte sauber getrennt sind.",
    },
  ],
};

const detailTags = {
  Profil: ["Frontend", "UI", "Lernen"],
  Stärken: ["Struktur", "Geduld", "Qualität"],
  Arbeitsweise: ["Feedback", "Team", "Klarheit"],
  Platz: ["Erfahrung", "Werte", "Ziele"],
  Auswahl: ["Web", "Tools", "Demos"],
  "Nächster Schritt": ["Cases", "Links", "Details"],
  Code: ["Ideen", "Logik", "Bauen"],
  Ride: ["Fokus", "Freiheit", "Ruhe"],
  Outdoor: ["Energie", "Abstand", "Frisch"],
  Spielen: ["Taktik", "Denken", "Zeit"],
  Winter: ["Piste", "Geduld", "Freiheit"],
  Gaming: ["Teamplay", "Strategie", "Reaktion"],
  Family: ["Zeit", "Rückhalt", "Motivation"],
  Geschützt: ["Privat", "Login", "Dokumente"],
  Zugriff: ["Auth", "Sichtbar", "Sicher"],
  Ordnung: ["Dateien", "Klar", "Getrennt"],
};

const aboutProfile = {
  birthday: "23.05.2008",
  intro: " Informatikschüler bwd Informatikmittelschule IMS Bern",
  focus: "Ich suche eine IMS-Praktikumsstelle, in der ich mein Wissen aus der Schule in der Praxis anwenden und mit viel Motivation, Neugier und Einsatzbereitschaft weiterentwickeln kann. Ich arbeite gerne im Team, übernehme Verantwortung und freue mich darauf, von erfahrenen Fachpersonen zu lernen. Mein Ziel ist es, nicht nur wertvolle Berufserfahrung zu sammeln, sondern aktiv zum Team beizutragen und mich fachlich wie auch persönlich kontinuierlich weiterzuentwickeln.",
};

const hobbyImages = {
  Programmieren: programmingImageUrl,
  Motorradfahren: motorcycleImageUrl,
  Pfadi: scoutsImageUrl,
  Brettspiele: boardgamesImageUrl,
  Snowboarding: snowboardingImageUrl,
};

const aboutSkillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 60 },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React", level: 70 },
      { name: "UI Design", level: 75 },
      { name: "Responsive", level: 82 },
    ],
  },
  {
    title: "Basics",
    skills: [
      { name: "Git", level: 65 },
      { name: "Debugging", level: 68 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    title: "Persönlich",
    skills: [
      { name: "Lernbereitschaft", level: 90 },
      { name: "Verantwortung", level: 76 },
      { name: "Fokus", level: 84 },
    ],
  },
];

const aboutTimeline = [
  {
    number: "01",
    label: "Wer ich bin",
    title: "Ich baue gern Dinge, die sich klar und lebendig anfühlen.",
    text:
      "Mich interessiert Webentwicklung, weil Gestaltung und Logik dort direkt zusammenkommen. Ich mag Interfaces, die ruhig aussehen, aber beim Benutzen Energie haben.",
  },
  {
    number: "02",
    label: "Wie ich arbeite",
    title: "Erst verstehen, dann sauber umsetzen.",
    text:
      "Ich frage lieber einmal mehr nach, teile Aufgaben in machbare Schritte und achte darauf, dass Code später noch nachvollziehbar bleibt.",
  },
  {
    number: "03",
    label: "Was mich antreibt",
    title: "Lernen ist am besten, wenn am Ende etwas Echtes steht.",
    text:
      "Kleine Prototypen, Bewerbungsseiten, Tools oder neue Layout-Ideen helfen mir, Technik nicht nur theoretisch zu kennen, sondern wirklich zu verstehen.",
  },
  {
    number: "04",
    label: "Platz für mehr",
    title: "Dieser Bereich kann wachsen.",
    text:
      "Hier passen später persönliche Stationen, konkrete Erfahrungen, Zertifikate, Werte oder ein kurzer Bewerbungsfokus rein, ohne dass die Seite voll wirkt.",
  },
];

const aboutStats = [
  { value: "EFZ", label: "Informatik Ausbildung" },
  { value: "CH", label: "Schweiz" },
  { value: "2026", label: "Bewerbungsfokus" },
];

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projekte" },
  { href: "/about", label: "Über mich" },
  { href: "/hobbies", label: "Hobbys" },
  { href: "/documents", label: "Bewerbungsunterlagen", locked: true },
];

const projects = [
  {
    name: "Chess",
    type: "Windows Game",
    summary: "Ein eigenes Schachspiel für Windows mit klassischer Spiellogik.",
    technologies: ["C++", "Windows", "Game Logic"],
    actions: [
      { label: "Play / .exe", href: "/api/projects/download/chess" },
      { label: "Projekt als ZIP", href: "/api/projects/archive/chess" },
    ],
    image: chessImageUrl,
  },
  {
    name: "Jump and Run",
    type: "Windows Game",
    summary: "Ein 2D-Jump-and-Run mit Levels, Steuerung und Retro-Feeling.",
    technologies: ["C#", "WinForms", "Game Design"],
    actions: [
      { label: "Play / .exe", href: "/api/projects/download/jump-and-run" },
      { label: "Projekt als ZIP", href: "/api/projects/archive/jump-and-run" },
    ],
    image: jumpAndRunImageUrl,
  },
  {
    name: "VendoSwiss",
    type: "Web Project",
    summary: "Ein eigenständiges Webprojekt mit Fokus auf klare Abläufe und Benutzerführung.",
    technologies: ["HTML", "CSS", "JavaScript"],
    actions: [
      { label: "Website testen", href: "https://vendoswiss.ch", external: true },
      { label: "Projekt als ZIP", href: "/api/projects/archive/vendoswiss" },
    ],
    image: vendoSwissImageUrl,
  },
  {
    name: "Stahlpartner",
    type: "Website",
    summary: "Unternehmenswebsite mit mehreren Inhaltsseiten und einem Anfragebereich.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    actions: [
      { label: "Website testen", href: "https://stahlpartner.ch", external: true },
      { label: "Projekt als ZIP", href: "/api/projects/archive/stahlpartner" },
    ],
    image: stahlpartnerImageUrl,
  },
  {
    name: "Swissactive",
    type: "App",
    summary: "Eine App rund um Aktivitäten und Wanderungen in der Schweiz. Die Windows-App wird als vollständiges ZIP zum Entpacken bereitgestellt.",
    technologies: ["C#", ".NET MAUI", "XAML"],
    actions: [
      { label: "Windows-App herunterladen (.exe)", href: "/api/projects/download/swissactive" },
      { label: "Projekt als ZIP", href: "/api/projects/archive/swissactive" },
    ],
    image: swissactiveImageUrl,
  },
  {
    name: "Health Clock",
    type: "Hardware Project",
    summary: "Ein kleines Hardware-Projekt mit Sensorik und gesundheitsbezogenen Anzeigen.",
    technologies: ["Arduino", "C++", "Hardware"],
    actions: [
      { label: "Demo-Video ansehen", href: "/video/smartwatch" },
      { label: "Projekt als ZIP", href: "/api/projects/archive/health-clock" },
    ],
    placeholder: "video",
  },
  {
    name: "Klassenseite",
    type: "Website · 1. Semester",
    summary: "Eine Klassenseite mit den Webseiten aus dem ersten Semester.",
    technologies: ["HTML", "CSS", "JavaScript"],
    actions: [
      { label: "Website öffnen", href: "http://116.203.218.177/", external: true },
      { label: "Projekt als ZIP", href: "/api/projects/archive/klassenseite" },
    ],
    image: classPageImageUrl,
  },
  {
    name: "TuneGuess",
    type: "Mobile App · ÜK",
    summary: "Eine im ÜK entwickelte Flutter-App zum Erraten von Songs. Das Demo-Video zeigt die App in Aktion.",
    technologies: ["Flutter", "Dart", "Mobile"],
    actions: [
      { label: "Demo-Video ansehen", href: "/video/tuneguess" },
      { label: "Projekt als ZIP", href: "/api/projects/archive/tuneguess" },
    ],
    placeholder: "video",
  },
  {
    name: "Preblox",
    type: "ÜK · Teamprojekt",
    summary: "Ein gemeinsam mit Thierry entwickeltes Webprojekt, das direkt im Browser gestartet werden kann.",
    technologies: ["React", "Vite", "Node.js"],
    actions: [
      { label: "Projekt starten", href: "/api/projects/preview/preblox", external: true },
      { label: "Projekt als ZIP", href: "/api/projects/archive/preblox" },
    ],
    image: prebloxImageUrl,
  },
];

function LockIcon() {
  return (
    <span className="lock-icon" aria-label="Gesperrt" role="img">
      <span />
    </span>
  );
}

function LogoIntro() {
  const [shouldShow] = useState(() => {
    if (window.sessionStorage.getItem("logoIntroSeen") === "true") {
      return false;
    }

    window.sessionStorage.setItem("logoIntroSeen", "true");
    return true;
  });
  const pieces = ["top-left", "top-right", "bottom-left", "bottom-right"];

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="logo-intro" aria-hidden="true">
      <div className="logo-intro-glow" />
      <div className="logo-split" aria-hidden="true">
        {pieces.map((piece) => (
          <span className={`logo-piece ${piece}`} key={piece}>
            <img src={logoUrl} alt="" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Header({ activePath, accent, isAuthenticated, onLogout }) {
  return (
    <header className="site-header" style={{ "--accent": accent }}>
      <a className="brand" href="/" aria-label="Zur Startseite">
        <span className="brand-mark">
          <img src={logoUrl} alt="" />
        </span>
        <span>Richard Eberhardt</span>
      </a>

      <nav className="nav" aria-label="Hauptnavigation">
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              className={activePath === item.href ? "active" : ""}
              href={item.href}
              key={item.href}
            >
              {item.locked ? <LockIcon /> : null}
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {isAuthenticated === true ? (
        <button className="login-link account-action" onClick={onLogout} type="button">
          Abmelden
        </button>
      ) : isAuthenticated === false ? (
        <a
          className={`login-link${activePath === "/login" ? " active" : ""}`}
          href="/login"
        >
          Login
        </a>
      ) : <span className="account-placeholder" aria-hidden="true" />}
    </header>
  );
}

function useSpotlight(initial = { x: 72, y: 34 }) {
  const [spotlight, setSpotlight] = useState(initial);

  function onPointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: Math.round(((event.clientX - bounds.left) / bounds.width) * 100),
      y: Math.round(((event.clientY - bounds.top) / bounds.height) * 100),
    });
  }

  return {
    spotlightStyle: {
      "--spotlight-x": `${spotlight.x}%`,
      "--spotlight-y": `${spotlight.y}%`,
    },
    onPointerMove,
  };
}

function AboutPage() {
  const { spotlightStyle, onPointerMove } = useSpotlight({ x: 64, y: 28 });

  return (
    <main
      className="about-page"
      style={{ "--accent": pages["/about"].accent, ...spotlightStyle }}
      onPointerMove={onPointerMove}
    >
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="eyebrow">Person / Fokus / Entwicklung</p>
          <h1 id="about-title">
            About
            <span>Richard</span>
          </h1>
          <p className="about-lead">
            Ich bin Informatiker EFZ in Ausbildung und interessiere mich für
            moderne Webentwicklung, starke Oberflächen und Projekte, bei denen
            aus einer Idee etwas Benutzbares entsteht.
          </p>
        </div>

        <aside className="about-card" aria-label="Kurzprofil">
          <span className="panel-label">Kurzprofil</span>
          <p>
            Ruhig im Vorgehen, neugierig bei neuen Themen und motiviert, jeden
            Schritt ein bisschen besser zu machen als den letzten.
          </p>
          <div className="about-card-line" />
        </aside>
      </section>

      <section className="about-strip" aria-label="Profil Fakten">
        {aboutStats.map((item) => (
          <div className="about-stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="about-story" aria-label="Mehr über mich">
        <div className="about-story-rail">
          <p className="eyebrow">Scroll / Story</p>
          <h2>Ein paar Dinge, die du über mich wissen kannst.</h2>
          <a href={`mailto:${profile.email}`}>Kontakt aufnehmen</a>
        </div>

        <div className="about-timeline">
          {aboutTimeline.map((item) => (
            <article className="about-step" key={item.number}>
              <span className="about-step-number">{item.number}</span>
              <div>
                <p className="panel-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-open-space" aria-label="Freier Bereich">
        <div>
          <p className="eyebrow">Next</p>
          <h2>Noch Platz für echte Details.</h2>
        </div>
        <p>
          Die Seite ist bewusst nicht vollgestopft. Wenn du später genauer
          weisst, was rein soll, können hier konkrete Erfahrungen, Projekte,
          ein persönlicher Text oder Bewerbungsunterlagen elegant dazukommen.
        </p>
      </section>
    </main>
  );
}

function HomePage() {
  const [activeSkill, setActiveSkill] = useState(skills[0]);
  const { spotlightStyle, onPointerMove } = useSpotlight();

  return (
    <main
      className="home"
      style={{ "--accent": activeSkill.accent, ...spotlightStyle }}
      onPointerMove={onPointerMove}
    >
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{profile.location} / Bewerbung 2026/27</p>
          <h1 id="hero-title">
            <span>Junior Developer</span>
            {profile.name}
          </h1>
          <p className="role">{profile.role}</p>
          <p className="lead">{profile.intro}</p>
          <div className="skill-row" aria-label="Skills">
            {skills.map((skill) => (
              <button
                className={skill.name === activeSkill.name ? "is-active" : ""}
                key={skill.name}
                onFocus={() => setActiveSkill(skill)}
                onMouseEnter={() => setActiveSkill(skill)}
                type="button"
              >
                {skill.name}
              </button>
            ))}
          </div>
          <div className="hero-links" aria-label="Wichtige Links">
            <a href="/documents">-&gt; Bewerbungsunterlagen</a>
            <a href={`mailto:${profile.email}`}>-&gt; Kontakt</a>
          </div>
        </div>

        <aside className="skill-panel" aria-live="polite">
          <span className="panel-label">{activeSkill.label}</span>
          <strong>{activeSkill.name}</strong>
          <p>{activeSkill.text}</p>
          <div className="signal-grid" aria-hidden="true">
            {skills.map((skill) => (
              <span
                className={skill.name === activeSkill.name ? "is-active" : ""}
                key={skill.name}
              />
            ))}
          </div>
        </aside>

        <a className="scroll-hint" href="/about" aria-label="Zu Über mich">
          <span>Zu Über mich</span>
          <b aria-hidden="true">↓</b>
        </a>
      </section>
    </main>
  );
}

function ProjectsPage() {
  return (
    <main className="projects-page" style={{ "--accent": pages["/projects"].accent }}>
      <section className="projects-hero" aria-labelledby="projects-title">
        <div className="projects-hero-copy">
          <h1 id="projects-title">Projects</h1>
        </div>
        <p>Eine Auswahl aus Websites, Apps, Spielen und kleinen Experimenten.</p>
      </section>

      <section className="projects-grid" aria-label="Projektübersicht">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <div className={`project-image-placeholder${project.placeholder ? ` project-image-${project.placeholder}` : ""}`}>
              {project.image ? <img src={project.image} alt={`Vorschau des Projekts ${project.name}`} /> : null}
              {!project.image ? (
                project.placeholder === "video" ? (
                  <div className="project-spotlight-copy">
                    <span>Featured Preview</span>
                    <strong>Interaktive Vorschau</strong>
                    <small>Ein kurzer Blick auf die Idee, klar und direkt inszeniert.</small>
                  </div>
                ) : (
                  <strong>Quellcode-Projekt</strong>
                )
              ) : null}
              <small>{project.type}</small>
            </div>
            <div className="project-card-content">
              <div className="project-card-heading">
                <div>
                  <p className="panel-label">{project.type}</p>
                  <h2>{project.name}</h2>
                </div>
              </div>
              <p className="project-summary">{project.summary}</p>
              <div className="project-tags" aria-label={`Technologien für ${project.name}`}>
                {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <div className="project-actions">
                {project.actions.map((action) => action.disabled ? (
                  <span className="project-action is-placeholder" key={action.label} title={action.hint}>{action.label}</span>
                ) : (
                  <a
                    className="project-action"
                    href={action.href}
                    key={action.label}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noreferrer" : undefined}
                  >
                    {action.label} <span>{action.external ? "↗" : "↓"}</span>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function SmartwatchVideoPage() {
  return (
    <main className="video-page" style={{ "--accent": pages["/projects"].accent }}>
      <section className="video-player-card" aria-labelledby="smartwatch-video-title">
        <a className="video-back" href="/projects">← Zurück zu Projekten</a>
        <p className="eyebrow">Health Clock · Demo</p>
        <h1 id="smartwatch-video-title">Smartwatch-Video</h1>
        <video autoPlay muted loop playsInline controls controlsList="nodownload" aria-label="Stummes Demo-Video des Health-Clock-Projekts">
          <source src={healthClockVideoUrl} type="video/mp4" />
        </video>
        <p>Dieses Video startet bewusst ohne Ton.</p>
      </section>
    </main>
  );
}

function TuneGuessVideoPage() {
  return (
    <main className="video-page" style={{ "--accent": pages["/projects"].accent }}>
      <section className="video-player-card" aria-labelledby="tuneguess-video-title">
        <a className="video-back" href="/projects">← Zurück zu Projekten</a>
        <p className="eyebrow">TuneGuess · ÜK-Demo</p>
        <h1 id="tuneguess-video-title">TuneGuess-Video</h1>
        <video autoPlay playsInline controls controlsList="nodownload" aria-label="Demo-Video der TuneGuess-App">
          <source src={tuneGuessVideoUrl} type="video/mp4" />
        </video>
        <p>Dieses Video wird mit Ton abgespielt.</p>
      </section>
    </main>
  );
}

function PlaceholderPage({ page }) {
  const { spotlightStyle, onPointerMove } = useSpotlight({ x: 58, y: 42 });
  const blocks = Array.from({ length: 9 }, (_, index) => index + 1);
  const activePath = window.location.pathname.replace(/\/$/, "") || "/";
  const details = pageDetails[activePath];
  const shouldZoomStage = page.title !== "Login" && details?.length;
  const isAboutStage = activePath === "/about";
  const isHobbiesStage = activePath === "/hobbies";

  return (
    <main
      className={`subpage subpage-${page.pattern}${shouldZoomStage ? " subpage-zoom" : ""}${isAboutStage ? " subpage-about-zoom" : ""}${isHobbiesStage ? " subpage-hobbies" : ""}`}
      style={{
        "--accent": page.accent,
        "--page-accent": page.accent,
        "--detail-shift": shouldZoomStage ? `${(details.length - 1) * 100}svh` : "0svh",
        ...spotlightStyle,
      }}
      onPointerMove={onPointerMove}
    >
      <section className="subpage-shell" aria-labelledby="page-title">
        <div className="subpage-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 id="page-title" className="subpage-title">
            {page.title}
          </h1>
        </div>

        <div className="stage">
          <div className="stage-frame">
            {page.locked ? (
              <div className="stage-lock">
                <LockIcon />
              </div>
            ) : null}
            {blocks.map((block) => (
              <span
                className={`stage-block stage-block-${block}`}
                key={block}
              />
            ))}
            {shouldZoomStage ? (
              <article className="stage-preview">
                <p className="panel-label">{details[0].kicker}</p>
                <h2>{details[0].title}</h2>
                <p>{details[0].text}</p>
              </article>
            ) : null}
          </div>
        </div>
        {shouldZoomStage ? (
          <div className="stage-content">
            {details.map((detail, index) => (
              <article className="stage-detail" key={`${detail.kicker}-${index}`}>
                {!isAboutStage ? (
                  <div className="stage-detail-copy">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p className="panel-label">{detail.kicker}</p>
                    <h2>{detail.title}</h2>
                    <p>{detail.text}</p>
                  </div>
                ) : null}
                <div
                  className={`stage-detail-visual${isHobbiesStage ? " stage-detail-image-slot" : ""}${isAboutStage && index === 0 ? " stage-detail-skills" : ""}`}
                >
                  {isHobbiesStage ? (
                    <img
                      className="stage-detail-image"
                      src={hobbyImages[detail.title]}
                      alt={`${detail.title} – Hobby von ${profile.name}`}
                    />
                  ) : isAboutStage && index === 0 ? (
                    <div className="skill-meter-card">
                      <div className="skill-card-head">
                        <div>
                          <span>Fähigkeiten</span>
                          <p>{detail.kicker} / Skill Map</p>
                        </div>
                      </div>
                      <div className="about-profile-panel">
                        <div className="about-photo-slot">
                          <img src={aboutImageUrl} alt={`Porträt von ${profile.name}`} />
                        </div>
                        <div className="about-profile-meta">
                          <p className="panel-label">Persönlich</p>
                          <h3>{profile.name}</h3>
                          <div className="birthday-pill">
                            <span>Geburtstag</span>
                            <strong>{aboutProfile.birthday}</strong>
                          </div>
                        </div>
                        <p>{aboutProfile.intro}</p>
                        <p>{aboutProfile.focus}</p>
                      </div>
                      <div className="skill-groups-grid">
                        {aboutSkillGroups.map((group) => (
                          <section className="skill-group" key={group.title}>
                            <h3>{group.title}</h3>
                            <div className="skill-meter-list">
                              {group.skills.map((skill) => (
                                <div className="skill-meter" key={skill.name}>
                                  <div>
                                    <span>{skill.name}</span>
                                    <strong>{skill.level}%</strong>
                                  </div>
                                  <i style={{ "--level": `${skill.level}%` }} />
                                </div>
                              ))}
                            </div>
                          </section>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="visual-orbit">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="visual-bars">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="visual-tags">
                        {(detailTags[detail.kicker] || ["Focus", "Build", "Learn"]).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
      {isHobbiesStage ? <div className="hobbies-scroll-cue" aria-hidden="true"><span>Weiter scrollen</span><b>↓</b></div> : null}
    </main>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((response) => response.json())
      .then(({ user }) => {
        if (user) window.location.replace("/documents");
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login fehlgeschlagen.");
      window.location.assign("/documents");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="auth-page" style={{ "--accent": pages["/login"].accent }}>
      <section className="auth-card" aria-labelledby="login-title">
        <p className="eyebrow">Privater Bereich</p>
        <h1 id="login-title">Login</h1>
        <p className="auth-intro">Dieser Zugang ist für Unternehmen bestimmt, mit denen Richard seine Bewerbungsunterlagen teilt.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            E-Mail-Adresse
            <input autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            Passwort
            <input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {message ? <p className="auth-error" role="alert">{message}</p> : null}
          <button disabled={isLoading} type="submit">{isLoading ? "Wird geprüft …" : "Einloggen"}</button>
        </form>
        <p className="auth-help">Kein Zugang? Bitte direkt bei Richard melden.</p>
      </section>
    </main>
  );
}

function DocumentsPage() {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function loadDocuments() {
      try {
        const me = await fetch("/api/me").then((response) => response.json());
        if (!me.user) return setStatus("signed-out");
        const documents = await fetch("/api/documents");
        if (!documents.ok) throw new Error();
        const data = await documents.json();
        setUser(me.user);
        setFiles(data.files);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    loadDocuments();
  }, []);

  const documentCategories = [
    {
      id: "zeugnisse",
      title: "Zeugnisse",
      fileHint: "zeugnisse.pdf oder zeugnisse-1.pdf",
      matches: (file) => /^zeugnisse(?:[-_ ].*)?\.pdf$/i.test(file),
      description: "Schulische Zeugnisse und Leistungsnachweise.",
      number: "01",
    },
    {
      id: "uek",
      title: "ÜK",
      fileHint: "uek-1.pdf, uek-2.pdf oder KNW-Dateien",
      matches: (file) => /^(?:uek|knw).*\.pdf$/i.test(file),
      description: "Nachweise aus überbetrieblichen Kursen.",
      number: "02",
    },
    {
      id: "arbeitszeugnisse",
      title: "Arbeitszeugnisse",
      fileHint: "arbeitszeugnisse.pdf oder arbeitszeugnisse-1.pdf",
      matches: (file) => /^arbeitszeugnis(?:[-_ ].*)?\.pdf$/i.test(file),
      description: "Arbeitsbestätigungen und Referenzen.",
      number: "03",
    },
    {
      id: "lebenslauf",
      title: "Lebenslauf",
      fileHint: "lebenslauf.pdf",
      matches: (file) => /^lebenslauf(?:[-_ ].*)?\.pdf$/i.test(file),
      description: "Aktueller Lebenslauf von Richard Eberhardt.",
      number: "04",
    },
  ];

  return (
    <main className="documents-page" style={{ "--accent": pages["/documents"].accent }}>
      <section className="documents-card" aria-labelledby="documents-title">
        {status === "loading" ? <p className="eyebrow">Zugang wird geprüft …</p> : null}
        {status === "signed-out" ? <>
          <p className="eyebrow">Privater Bereich</p>
          <h1 id="documents-title">Dokumente</h1>
          <p className="auth-intro">Bitte loggen sie sich ein, um die Bewerbungsunterlagen zu sehen.</p>
          <a className="auth-button" href="/login">Zum Login</a>
        </> : null}
        {status === "error" ? <p className="auth-error">Die Dokumente konnten gerade nicht geladen werden.</p> : null}
        {status === "ready" ? <>
        <div className="documents-heading">
            <div><p className="eyebrow">Freigegeben für {user.company}</p><h1 id="documents-title">Dokumente</h1></div>
            <a className="documents-download-all" href="/api/documents/archive">Alle als ZIP <span>↓</span></a>
          </div>
          <p className="documents-intro">Wähle ein Dokument aus, um die PDF-Datei anzusehen oder herunterzuladen.</p>
          <div className="document-grid">
            {documentCategories.map((category) => {
              const categoryFiles = files.filter(category.matches);

              return (
                <article className={`document-tile${categoryFiles.length ? " is-available" : ""}`} key={category.id}>
                  <div className="document-tile-top">
                    <span className="document-number">{category.number}</span>
                    <span className="document-filetype">PDF</span>
                  </div>
                  <div>
                    <h2>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                  {categoryFiles.length ? (
                    <div className="document-file-list">
                      {categoryFiles.map((file) => {
                        const documentUrl = `/api/documents/${encodeURIComponent(file)}`;
                        return <div className="document-file" key={file}>
                          <span title={file}>{file}</span>
                          <div className="document-actions">
                            <a href={documentUrl} target="_blank" rel="noreferrer">Ansehen <span>↗</span></a>
                            <a href={`${documentUrl}?download=1`}>Download <span>↓</span></a>
                          </div>
                        </div>;
                      })}
                    </div>
                  ) : (
                    <p className="document-placeholder">Platzhalter · Lege <code>{category.fileHint}</code> in den privaten Ordner.</p>
                  )}
                </article>
              );
            })}
          </div>
        </> : null}
      </section>
    </main>
  );
}

function App() {
  const activePath = window.location.pathname.replace(/\/$/, "") || "/";
  const page = pages[activePath];
  const accent = page?.accent || skills[0].accent;
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("/api/me")
      .then((response) => response.json())
      .then(({ user }) => setIsAuthenticated(Boolean(user)))
      .catch(() => setIsAuthenticated(false));
  }, []);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    setIsAuthenticated(false);
    window.location.assign("/login");
  }

  return (
    <>
      <LogoIntro />
      <Header activePath={activePath} accent={accent} isAuthenticated={isAuthenticated} onLogout={logout} />
      {activePath === "/login" ? (
        <LoginPage />
      ) : activePath === "/documents" ? (
        <DocumentsPage />
      ) : activePath === "/projects" ? (
        <ProjectsPage />
      ) : activePath === "/video/smartwatch" ? (
        <SmartwatchVideoPage />
      ) : activePath === "/video/tuneguess" ? (
        <TuneGuessVideoPage />
      ) : page ? (
        <PlaceholderPage page={page} />
      ) : (
        <HomePage />
      )}
      <footer className="footer">
        <span>{profile.name}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
