# KI-Baukasten

Eine mit Vite und Vanilla JavaScript erstellte Webanwendung zur Kommunikation von Regeln für den Einsatz generativer KI in Lehrveranstaltungen.

> **Hinweis:** Dieses Projekt ist "vibe-coded" — größtenteils iterativ per KI-Coding-Assistent
> entstanden, mit Fokus auf schnelles, funktionierendes Ergebnis statt auf durchdachte
> Architektur. Details und Hinweise für die Weiterarbeit siehe
> [`AGENTS.md`](AGENTS.md).

## Entwicklung

Voraussetzung ist Node.js 22 oder neuer. Abhängigkeiten installieren und den Entwicklungsserver starten:

```bash
npm install
npm run dev
```

Für eine lokale Produktionsvorschau:

```bash
npm run build
npm run preview
```

Mit `npm run lint` werden die JavaScript-Dateien geprüft.

## Deployment

Der Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) prüft und baut die Anwendung bei jedem Commit auf `main` und veröffentlicht den Inhalt von `dist/` auf GitHub Pages. Der Workflow kann außerdem manuell gestartet werden.

Im Repository muss unter **Settings → Pages → Build and deployment** einmalig **GitHub Actions** als Quelle ausgewählt sein.

## Funktionen

- Deutsch und Englisch
- umschaltbares Design: neutral (Standard, passt sich fremden Folienvorlagen an) oder CD (UR-Corporate-Design in Glutrot für den Lehrstuhl für Medieninformatik), wirkt auf die ganze Anwendung inkl. Export
- granulare Ampelregeln für 12 Einsatzbereiche (immer sichtbar)
- gegeneinander ausgeschlossene Basisoptionen für die Dokumentation
- optionale zweite Seite mit Beispielen & Hinweisen, sobald eines der Felder ausgefüllt ist, in drei festen Spalten (erlaubt / nicht erlaubt / weitere Hinweise); die Felder unterstützen ein kleines Markdown-Subset (`- `/`* ` für Aufzählungen, `**fett**`, `*kursiv*`), identisch dargestellt in Vorschau, PNG- und PPTX-Export
- Folienähnliche Ampel-Vorschau im festen 16:9-Format (wie die Miniaturansicht einer PDF-Seite: die Vorschau verkleinert sich proportional statt das Format zu wechseln, auch auf schmalen Bildschirmen)
- Live-Aktualisierung der Vorschau bei jeder Eingabe
- kopierbare Textfassung
- PNG-Download (eine Datei pro Seite)
- PPTX-Download als editierbare PowerPoint-Folie(n)

Die Anwendung verwendet Vite mit `src/index.html` als Einstiegspunkt. JavaScript und CSS liegen getrennt unter `src/js/` und `src/css/`, statische Dateien unter `public/assets/`. Das Produktions-Bundle wird nach `dist/` geschrieben und bleibt vollständig statisch.
