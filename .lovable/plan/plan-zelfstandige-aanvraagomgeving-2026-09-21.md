# Plan: zelfstandige aanvraagomgeving

## Doel
Maak `/hulp-aanvragen` een rustige, moderne aanvraagervaring zonder de normale websitenavigatie en footer. Behoud alle bestaande vragen, conditionele logica, validatie, commissie-routing en de eerlijke status wanneer e-mailverzending nog niet actief is.

## Uitvoering
- Verberg op deze route de normale header, footer en vaste hulpknop; andere pagina's blijven ongewijzigd.
- Voeg een compacte aanvraagheader toe met Caritas BOAZ-logo en een duidelijke, sticky terugknop.
- Geef de volledige route een zachte, eigen achtergrond met bestaande lichtblauwe, gebroken witte, groene en terracotta stijltokens; geen blobs of drukke illustraties.
- Plaats de intro, iedere stap, de controle en de bevestiging in één consistente, ruime formulieromgeving die op desktop gecentreerd staat en op mobiel het scherm efficiënt gebruikt.
- Maak de voortgang prominenter met “Uw aanvraag”, stapnummer, huidige stap en een toegankelijke voortgangsbalk.
- Verfijn keuzevelden, invoervelden, uploadzone, bedragen, samenvatting, foutmeldingen en vorige/volgende-acties voor duidelijke hiërarchie en toetsenbordbediening.
- Behoud de huidige acht logische stappen om alle bestaande formulierinformatie volledig mee te nemen; alleen relevante velden blijven zichtbaar.
- Bewaar invoer in React-state zolang de aanvraagpagina geopend blijft; gevoelige gegevens zoals IBAN worden niet in browseropslag, URL, logs of analytics gezet.
- Voorkom dubbele indiening met de bestaande verzendstatus en uitgeschakelde indienknop.
- Toon het volledige ontvangstscherm alleen wanneer de server echte verzending bevestigt. Zolang e-mail niet is ingesteld, blijft de huidige eerlijke foutstatus bestaan en blijven ingevulde gegevens beschikbaar.

## Controle
- Doorloop de aanvraag op desktop en mobiel, inclusief teruggaan, validatiefouten, conditionele organisatievelden, bedragen, regio-routing, uploadcontrole en samenvatting.
- Controleer toetsenbordfocus, geen horizontale scroll, geen browserfouten en een foutloze preview-build.
