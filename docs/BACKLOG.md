# Backlog — sotho-briefing

> Ein Issue = ein Durchgang mit Claude. Oben steht, was als Nächstes dran ist.
> Status: ⬜ offen · 🔧 in Arbeit · ✅ fertig (alle Kriterien im Browser geprüft)
> Aufbau jedes Issues: **Ziel** (was danach möglich ist, für wen und warum – „damit …“) · **Nicht im Umfang** · **Akzeptanzkriterien** (Gegeben … wenn … dann …) · **Fertig, wenn** (woran man es prüft).

## Issue 1 — Quiz machen und Stil-Ergebnis sehen ✅ fertig

**Ziel:** Eine Kundin kann ein kurzes Bilder-Quiz machen und danach ihren Stil in Alltagssprache sehen, damit sie ihren Geschmack zeigen kann, ohne ihn beschreiben zu müssen.

**Nicht im Umfang:** Eigene Bilder der Designerin, Speichern des Ergebnisses, Verknüpfung mit Raumvorschlägen, Konto oder Anmeldung. Die Bilder sind in diesem Issue feste Beispielbilder.

**Akzeptanzkriterien:**
- Gegeben die Startseite, wenn die Kundin auf „Quiz starten“ tippt, dann sieht sie ein Bildpaar mit der Frage „Welches gefällt dir mehr?“.
- Gegeben ein Bildpaar, wenn sie ein Bild antippt, dann erscheint das nächste Paar, und eine Anzeige zeigt, wie weit sie ist (z. B. „3 von 8“).
- Gegeben das letzte Paar, wenn sie antwortet, dann sieht sie ihren Stil als kurzen Satz (z. B. „warm, natürlich, eher schlicht“) mit drei Beispielbildern.
- Gegeben ein Quiz, das noch nicht fertig ist, wenn sie die Seite verlässt und neu öffnet, dann beginnt das Quiz von vorn und es erscheint kein halbes Ergebnis.
- Gegeben ein Handy mit 375 px Breite, dann sind beide Bilder ohne Scrollen antippbar.

**Fertig, wenn:** Du das Quiz am Handy und am Laptop einmal durchspielst und ein Stil-Ergebnis siehst, das zu deinen Antworten passt.

## Issue 2 — Eigene Quiz-Bilder der Designerin ⬜ offen

**Ziel:** Die Designerin kann die Bilder für das Quiz selbst anlegen und jedem einen Stil zuordnen, damit das Quiz zu ihrem Studio passt und die Passung später stimmt.

**Nicht im Umfang:** Raumvorschläge, mehrere Designer\*innen in einem Studio, Bildbearbeitung. Dieses Issue braucht eine Datenbank und eine Anmeldung der Designerin (vorher Okay einholen).

**Akzeptanzkriterien:**
- Gegeben eine angemeldete Designerin, wenn sie ein Bild hochlädt und einen Stil wählt, dann erscheint es in ihrer Bilderliste mit diesem Stil.
- Gegeben die Bilderliste, wenn sie ein Bild löscht, dann verschwindet es aus der Liste und aus dem Quiz.
- Gegeben weniger als 8 Bilder oder weniger als 2 pro Stil, wenn die Designerin die Liste ansieht, dann steht dort ein Hinweis, was noch fehlt, und das Quiz nutzt bis dahin die Beispielbilder.
- Gegeben eine Person ohne Anmeldung, wenn sie die Seite zum Anlegen öffnet, dann kommt sie nicht hinein und sieht einen Hinweis zur Anmeldung.
- Gegeben eine Datei, die kein Bild ist, wenn die Designerin sie hochladen will, dann erscheint eine verständliche Meldung.

**Fertig, wenn:** Du dich anmeldest, 8 Bilder anlegst und das Quiz aus Issue 1 danach deine Bilder zeigt.

## Issue 3 — Raumvorschläge hochladen ⬜ offen

**Ziel:** Die Designerin kann pro Projekt Raumvorschläge anlegen und sieht, wie jeder Vorschlag steht, damit alle Vorschläge an einem Ort liegen und sie weiß, wo sie nachfassen muss.

**Nicht im Umfang:** Passung, Genehmigen durch die Kundschaft, Varianten A/B, eine Übersicht über alle Kundschaften, Bezahlung.

**Akzeptanzkriterien:**
- Gegeben eine angemeldete Designerin, wenn sie ein Projekt mit dem Namen der Kundschaft anlegt, dann erscheint es in ihrer Projektliste und hat einen eigenen Link für die Kundschaft.
- Gegeben ein Projekt, wenn sie einen Raumvorschlag mit Raumname, mindestens einem Bild und kurzem Text anlegt, dann erscheint er im Projekt mit dem Status „offen“.
- Gegeben ein Raumvorschlag, wenn sie ihn löscht, dann verschwindet er aus dem Projekt.
- Gegeben ein neuer Raumvorschlag ohne Bild oder ohne Raumname, wenn sie speichern will, dann erscheint eine verständliche Meldung und nichts wird gespeichert.
- Gegeben ein Projekt ohne Vorschläge, dann steht dort ein Satz und ein Link zum Anlegen des ersten Vorschlags.

**Fertig, wenn:** Du ein Projekt mit zwei Raumvorschlägen anlegst und beide mit Status „offen“ in der Liste siehst.

## Issue 4 — Passung je Vorschlag ⬜ offen

**Ziel:** Die Kundschaft und die Designerin sehen, wie gut jeder Raumvorschlag zum Stil der Kundschaft passt, damit schwache Vorschläge früh auffallen.

**Nicht im Umfang:** Genehmigen oder Kommentieren, Stil-Zuordnung der Vorschläge durch KI (die Designerin ordnet selbst zu), eine genaue wissenschaftliche Berechnung.

**Akzeptanzkriterien:**
- Gegeben ein Projekt-Link, wenn die Kundschaft das Quiz macht, dann wird ihr Stil zum Projekt gespeichert.
- Gegeben ein Raumvorschlag, wenn die Designerin ihm einen oder mehrere Stile zuordnet, dann kann sie ihn speichern.
- Gegeben ein gespeichertes Quiz-Ergebnis, wenn die Kundschaft ihre Vorschläge öffnet, dann zeigt jeder eine Passung (z. B. „82 %“) mit einem Satz, warum.
- Gegeben ein Projekt, in dem die Kundschaft das Quiz noch nicht gemacht hat, dann steht bei den Vorschlägen „Passung folgt nach dem Quiz“ statt einer Zahl.
- Gegeben die Projektansicht der Designerin, dann sieht sie dieselbe Passung je Vorschlag.

**Fertig, wenn:** Du als Kundin das Quiz machst und danach bei zwei Vorschlägen mit unterschiedlichem Stil zwei unterschiedliche Passungen siehst.

## Issue 5 — Genehmigen oder kommentieren mit einem Klick ⬜ offen

**Ziel:** Die Kundschaft kann jeden Raumvorschlag mit einem Klick genehmigen oder mit Grund zurückweisen, damit die Designerin sofort konkretes Feedback hat.

**Nicht im Umfang:** Chat, Antworten der Designerin auf Kommentare, Benachrichtigungen per E-Mail.

**Akzeptanzkriterien:**
- Gegeben ein Raumvorschlag, wenn die Kundschaft „Gefällt mir“ tippt, dann steht der Status auf „genehmigt“, und das sieht auch die Designerin.
- Gegeben ein Raumvorschlag, wenn die Kundschaft „Noch nicht“ tippt, dann muss sie einen Grund wählen (z. B. zu dunkel, zu kühl, zu voll, anderer Grund) und kann einen kurzen Text ergänzen.
- Gegeben „Noch nicht“ ohne gewählten Grund, wenn sie absenden will, dann erscheint eine Meldung und nichts wird gespeichert.
- Gegeben eine Entscheidung, wenn die Kundschaft die Seite neu lädt, dann steht die Entscheidung noch da, und sie kann sie ändern.
- Gegeben ein Handy mit 375 px Breite, dann sind beide Knöpfe ohne Scrollen erreichbar und mindestens 44 px hoch.

**Fertig, wenn:** Du als Kundin einen Vorschlag genehmigst und einen mit Grund zurückweist und die Designerin beides mit Status und Grund sieht.

