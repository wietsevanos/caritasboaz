# Plan: samenhangende visuele versterking Caritas BOAZ

## Doel
De bestaande website blijft inhoudelijk en visueel herkenbaar, maar de binnenpagina’s krijgen opnieuw het warme, rustige ritme uit de zes referentiebeelden: duidelijke secties, afwisselende kleurvlakken, consistente uitlijning en logische routes naar **Hulp aanvragen**. De homepage en aanvraagwizard worden niet opnieuw ontworpen.

## Visuele uitgangspunten
- Behoud Sora, Manrope, de bestaande knoppen, het logo en de huidige semantische kleurtokens.
- Gebruik kleur als pagina-architectuur: wit, lichtblauw, zachtgroen, warm zand en een enkele donkerblauwe CTA-sectie.
- Houd vormen strak met maximaal 8px afronding, lichte randen en geen zware schaduwen.
- Werk overal vanuit dezelfde centrale contentbreedtes en een vast desktopgrid; tablet en mobiel vallen logisch terug naar één kolom.
- Wissel composities bewust af: gecentreerde of tweekoloms introducties, brede kleurbanden, rustige grids en een duidelijke afsluitende CTA.
- Gebruik bestaande illustraties alleen waar ze inhoudelijk passen; geen willekeurige decoratie of nieuwe feiten.

## Gedeelde bouwstenen
- Voeg een herbruikbare afsluitende CTA-sectie toe met donkerblauwe of warme achtergrond, korte ondersteunende tekst en één duidelijke knop naar `/hulp-aanvragen`.
- Voeg waar nuttig een gedeelde paginainleiding en eenvoudige sectie-/informatieblokken toe, gebaseerd op de bestaande `Section`, `Container`, `Eyebrow`, `Reveal` en `ButtonLink`.
- Houd alle kleur-, focus-, animatie- en reduced-motionregels binnen het bestaande ontwerpsysteem.

## Pagina’s

### Homepage
- Behoud de huidige hoofdopbouw, inhoud en illustraties.
- Verbeter alleen kleine uitlijnings- of ritmeverschillen als die nodig zijn voor samenhang met de binnenpagina’s.
- Houd de bestaande directe route naar **Hulp aanvragen** prominent.

### Over ons
- Maak de introductie ruim en gebalanceerd, met tekst en een passende bestaande illustratie.
- Zet het bestuur in een brede lichtblauwe sectie met een duidelijk ledenoverzicht.
- Plaats de twee commissies in een witte sectie als gelijkwaardige, goed uitgelijnde blokken met klikbare e-mailadressen.
- Geef de aanvraaginformatie een zachtgroene of warme accentsectie.
- Sluit af met de gedeelde CTA naar **Hulp aanvragen**.

### Geschiedenis
- Behoud uitsluitend de aangeleverde historische tekst en de lege tijdlijnstatus; voeg geen jaartallen of feiten toe.
- Geef de introductie een rustig beeld-/tekstverband.
- Plaats context in lichtblauw en de tijdlijn op wit met een duidelijke verticale structuur die klaar is voor latere inhoud.
- Maak de voorbereidende ruimte voor foto’s/documenten een lichtgroene sectie zonder te suggereren dat materiaal al beschikbaar is.
- Sluit af met de gedeelde CTA.

### Voorbeelden
- Behoud het ene goedgekeurde anonieme voorbeeld en de melding dat meer voorbeelden later volgen.
- Presenteer het voorbeeld in een sterker, breed contentblok met kleur, hiërarchie en voldoende witruimte.
- Gebruik een tweede rustige sectie om anonimiteit en toekomstige aanvulling helder te plaatsen, zonder nieuwe voorbeelden te verzinnen.
- Sluit af met een duidelijke vraag en knop naar **Hulp aanvragen**.

### Contact
- Maak een duidelijke introductie, gevolgd door twee gelijkwaardige regioblokken met e-mail, rekeninggegevens en RSIN.
- Houd de bestaande steun-informatie in een aparte warme zandsectie met overzichtelijke rekeningblokken.
- Maak onderscheid tussen contact opnemen en financiële ondersteuning aanvragen.
- Sluit af met een prominente CTA naar de aanvraagwizard.

### Privacy
- Behoud alle bestaande privacytekst.
- Verdeel de tekst visueel in rustige witte en zachtgekleurde secties of een overzichtelijk tweekoloms patroon op desktop.
- Houd deze pagina soberder dan de overige pagina’s, met een logische verwijzing naar contact en hulp aanvragen zonder commerciële nadruk.

### Hulp aanvragen
- Behoud de huidige telefoonweergave en de recent vereenvoudigde desktopvoortgang.
- Verander de inhoud, validatie, centrale formulierstatus en toekomstige verzendkoppeling niet.
- Pas alleen de omringende pagina-achtergrond/ruimte aan als dat nodig is om visueel bij de vernieuwde website aan te sluiten.

## Responsive en toegankelijkheid
- Controleer desktop, tablet en telefoon op alle routes.
- Voorkom horizontale scroll, afgesneden tekst, onnodige lege hoogtes en te smalle kaarten.
- Behoud semantische koppen, toetsenbordbediening, zichtbare focus, leesbaar contrast en ondersteuning voor `prefers-reduced-motion`.
- CTA’s verschijnen alleen na relevante inhoud en blijven op mobiel groot en makkelijk aan te tikken.

## Controle
- Loop alle pagina’s visueel na op desktop en mobiel.
- Controleer alle navigatie, e-maillinks, CTA’s en de volledige aanvraagflow.
- Controleer dat geen bestaande relevante inhoud is verdwenen en dat geen niet-aangeleverde feiten zijn toegevoegd.
- Bevestig dat de preview foutloos bouwt en geen runtime- of consolefouten toont.
