# KI-Baukasten

Ein einfacher, build-freier HTML/JavaScript-Prototyp zur Kommunikation von Regeln für den Einsatz generativer KI in Lehrveranstaltungen.

> **Hinweis:** Dieses Projekt ist "vibe-coded" — größtenteils iterativ per KI-Coding-Assistent
> entstanden, mit Fokus auf schnelles, funktionierendes Ergebnis statt auf durchdachte
> Architektur. Details und Hinweise für die Weiterarbeit siehe
> [`AGENTS.md`](AGENTS.md).

## Starten

`index.html` direkt im Browser öffnen. Alternativ im Projektordner einen lokalen Webserver starten, zum Beispiel:

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000/` öffnen.

## Funktionen

- Deutsch und Englisch
- umschaltbares Design: neutral (Standard, passt sich fremden Folienvorlagen an) oder CD (Lehrstuhl-Look), wirkt auf die ganze Anwendung inkl. Export
- granulare Ampelregeln für 12 Einsatzbereiche (immer sichtbar)
- gegeneinander ausgeschlossene Basisoptionen für die Dokumentation
- optionale zweite Seite mit Beispielen & Hinweisen, sobald eines der Felder ausgefüllt ist
- Folienähnliche Ampel-Vorschau
- Live-Aktualisierung der Vorschau bei jeder Eingabe
- kopierbare Textfassung
- PNG-Download (eine Datei pro Seite)
- PPTX-Download als editierbare PowerPoint-Folie(n)

Die aktuelle Anwendung besteht aus `index.html`, `app.js` und `styles.css`.
