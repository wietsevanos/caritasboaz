# Caritas BOAZ — moderne website

Een volledig responsive website met zes pagina's, een eigen kleur- en typografiesysteem en subtiele, continu lopende visuele effecten. Strakke vormen (hoeken van 4–8px), rustige opbouw, per sectie een eigen ritme.

## Stijl

- **Typografie:** Sora voor koppen, Manrope voor bodytekst. Ruime regelafstand, weinig verschillende maten, extra aandacht voor leesbaarheid.
- **Kleurritme:** gedempt donkerblauw als basis, met zachte accenten in lichtblauw, salie/zachtgroen, warm zand en een spaarzaam terracotta. Secties wisselen af: wit → zachtblauw → wit met groen accent → warm zand → wit → zachtgroen.
- **Vormen:** hoeken maximaal 8px, geen pill-buttons, geen ronde kaarten, geen blobs, geen zware schaduwen.
- **Beweging:** drie strategische plekken met een traag lopende, abstracte lijn/vlak-animatie (hero, "Niemand zou er alleen voor moeten staan", CTA-sectie). Verder alleen fijne hover- en verschijn-effecten. Bij "minder beweging" in de systeeminstellingen worden animaties uitgeschakeld.

## Pagina's

**Home**
- Hero: "Samen helpen wanneer hulp nodig is." + subtitel, twee knoppen die op desktop exact even groot naast elkaar staan en op mobiel even breed onder elkaar. Ernaast een abstracte grafische compositie met langzaam bewegende lijnen en kleurvlakken.
- Introductie "Er voor mensen in onze omgeving." — grote tekst aan één zijde, aan de andere zijde de vier kernen (Bloemendaal, Overveen, Aerdenhout, Zandvoort) als grafische compositie met grote nummers en dunne lijnen.
- "Waar wij kunnen helpen" — editorial layout met grote nummering 01–04, wisselende uitlijning, lijnen en kleine kleuraccenten in plaats van vier gelijke kaarten.
- "Niemand zou er alleen voor moeten staan." — warme zandsectie met drie kernwoorden (Praktisch, Persoonlijk, Betrokken) in wisselende schaal met verticale lijnen en een rustig bewegend achtergronddetail.
- "Een greep uit wat wij doen." — asymmetrische grid met vier anonieme voorbeelden in afwisselende kleurvlakken, privacy-notitie en knop naar de voorbeeldenpagina.
- Blok "Acute nood" met naam, klikbaar telefoonnummer en e-mailadres, plus de 112-melding.
- CTA "Hulp nodig?" op een krachtig, niet-blauw kleurvlak.

**Over ons** — "Over Caritas BOAZ": achtergrond, eigen bestuur, zelfstandig financieel beheer, sociaal-charitatief werk, werkgebied. Daarna "Waar wij voor staan" met vier kernwaarden in een editorial compositie met grote statements.

**Geschiedenis** — "Een geschiedenis van omzien naar elkaar." Flexibele opzet met plek voor introductie, historische teksten, een tijdlijn, afbeeldingen, documenten en belangrijke momenten. Geen verzonnen feiten; duidelijk gemarkeerde plekken die later met het boekje gevuld worden.

**Voorbeelden** — "Voorbeelden van ondersteuning" met intro over anonimiteit en vier voorbeelden in verschillende visuele opmaak.

**Hulp aanvragen** — "Heeft u hulp nodig?" met een rustig, toegankelijk formulier: naam, e-mail, telefoon, woonplaats, onderwerp (vijf opties), groot tekstveld, eerder contact met instanties (ja/nee/onbekend), optionele toevoeging, privacytekst en knop "Verstuur aanvraag". Validatie met duidelijke foutmeldingen. Na versturen verschijnt "Bedankt voor uw bericht." Aanvragen worden nu nog niet bewaard of gemaild — dat kan later toegevoegd worden. Nergens een belofte van ondersteuning. Onderaan het blok Acute nood.

**Contact** — "Neem contact met ons op." Tweekoloms opzet met de blokken Bloemendaal en Overveen, Aerdenhout en Zandvoort (e-mail, rekeningnummer, naamstelling, RSIN) en Acute nood, elk met een eigen zachte kleurtoon. Daaronder "Steun ons" (giften en legaten, ANBI-aftrekbaarheid) en "Doe mee" met knop "Neem contact op" en de afsluiting "Caritas BOAZ zijn we samen."

**Privacyverklaring** — aparte pagina met een nette basistekst over zorgvuldige, vertrouwelijke omgang met gegevens; later aan te scherpen.

## Header en footer

Sticky, minimalistische header: links CARITAS BOAZ, rechts Home, Over ons, Geschiedenis, Voorbeelden, Contact en de knop "Hulp aanvragen". Bij scrollen een subtiele achtergrondwissel en dunne lijn. Op mobiel een hamburgermenu met grote raakvlakken; de knop blijft zichtbaar.

Rustige footer in een donkere warme tint met de naam, de vier kernen en links naar alle pagina's inclusief privacyverklaring.

## Technische opzet

- TanStack Router: aparte routes voor `/`, `/over-ons`, `/geschiedenis`, `/voorbeelden`, `/hulp-aanvragen`, `/contact`, `/privacyverklaring`, elk met eigen titel en beschrijving voor zoekmachines en sociale media.
- Design tokens in `src/styles.css` (`@theme inline`): kleuren in oklch, radius-schaal 4–8px, fonts via `<link>` in `__root.tsx`.
- Herbruikbare componenten: `Header`, `MobileNav`, `Footer`, `Section`, `Container`, `Button`, `Eyebrow`, `Statement`, `InfoBlock`, `ContactBlock`, formulierveld-componenten, en een `Reveal`-helper voor verschijn-animaties.
- Achtergrondanimaties als lichte SVG/CSS-componenten (geen extra zware libraries), zachter op mobiel, uitgeschakeld bij `prefers-reduced-motion`.
- Formuliervalidatie met zod, toegankelijke labels, `aria-invalid` en foutmeldingen gekoppeld aan de velden.
- Semantische HTML, één h1 per pagina, duidelijke focusstates, voldoende contrast, geen horizontaal scrollen.

## Nog nodig van jullie

- De inhoud uit het historische boekje voor de pagina Geschiedenis.
- Later: waar hulpaanvragen naartoe moeten (opslaan of e-mail).
