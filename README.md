# Bewerbungsseite mit geschütztem Dokumentenbereich

## Lokal starten

Öffne zwei PowerShell-Fenster im Projektordner.

Im ersten Fenster startest du das Backend:

```powershell
npm run dev:api
```

Im zweiten Fenster startest du die Webseite:

```powershell
npm run dev
```

Öffne danach die Adresse, die Vite anzeigt (normalerweise `http://127.0.0.1:5173`).

## Einen Firmenzugang erstellen

Führe diesen Befehl im Projektordner aus:

```powershell
npm run create-user
```

Dann beantwortest du die drei Fragen. Verwende pro Firma eine eigene E-Mail-Adresse und ein einzigartiges Passwort mit mindestens 12 Zeichen. Die Logins werden in `data/users.json` gespeichert. Diese Datei ist absichtlich in `.gitignore` und darf nie veröffentlicht oder per E-Mail verschickt werden.

## Dokumente hinzufügen

Lege PDFs in den Ordner `private-documents`. Sie erscheinen nach einem erfolgreichen Login automatisch auf der Seite **Documents**. Dieser Ordner ist ebenfalls nicht öffentlich und wird nicht in Git gespeichert.

Beispiel: `private-documents/Lebenslauf-Richard-Eberhardt.pdf`

## Was die wichtigen Dateien machen

- `server.mjs`: Das Backend. Prüft Passwörter, erstellt Sitzungen und gibt private Dateien nur nach Login aus.
- `scripts/create-user.mjs`: Das kleine Werkzeug zum Erstellen von Firmenzugängen.
- `src/main.jsx`: Die Login- und Dokumentenoberfläche.
- `private-documents`: Der private Speicherort für PDFs und andere erlaubte Dateien.
- `data/users.json`: Die lokale Login-Datenbank. Passwörter stehen darin nicht lesbar, sondern nur als sicherer Hash.

## Für das Deployment

Baue zuerst das Frontend und starte danach den Server im Produktionsmodus:

```powershell
npm run build
$env:NODE_ENV="production"
npm start
```

Der Node-Server liefert dabei die gebaute Seite und die API gemeinsam aus. Für eine öffentliche Seite sollte davor HTTPS aktiviert sein, zum Beispiel über den Hoster oder einen Reverse Proxy.
