import { createServerFn } from "@tanstack/react-start";
import {
  LEGE_AANVRAAG,
  STAPPEN,
  maakSamenvatting,
  valideerStap,
  type AanvraagData,
} from "./aanvraag";

export type VerzendResultaat =
  | { status: "verzonden"; commissie: string; datum: string }
  | { status: "mail-niet-ingesteld"; commissie: string }
  | { status: "ongeldig"; melding: string };

/**
 * Verzendt de aanvraag naar de commissie die bij de gekozen plaats hoort.
 *
 * De e-mailverzending zelf wordt hier aangesloten zodra het afzenderdomein van
 * Caritas BOAZ is ingesteld. Tot die tijd verzint deze functie geen verzending:
 * ze valideert de aanvraag en meldt eerlijk dat verzenden nog niet actief is.
 */
export const verzendAanvraag = createServerFn({ method: "POST" })
  .inputValidator((input: { aanvraag: AanvraagData }) => input)
  .handler(async ({ data }): Promise<VerzendResultaat> => {
    const aanvraag: AanvraagData = { ...LEGE_AANVRAAG, ...data.aanvraag };

    for (const stap of STAPPEN) {
      const fouten = valideerStap(stap.id, aanvraag);
      const eerste = Object.values(fouten)[0];
      if (eerste) return { status: "ongeldig", melding: eerste };
    }

    const samenvatting = maakSamenvatting(aanvraag);
    if (!samenvatting) {
      return { status: "ongeldig", melding: "Kies een plaats om verder te gaan." };
    }

    // Plek voor de e-mailverzending naar samenvatting.commissie.email,
    // met onderwerp "Nieuwe hulpaanvraag Caritas BOAZ" en de secties uit
    // maakSamenvatting() als overzicht.
    return { status: "mail-niet-ingesteld", commissie: samenvatting.commissie.naam };
  });
