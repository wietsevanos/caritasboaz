/**
 * Centrale configuratie en logica voor de hulpaanvraag van Caritas BOAZ.
 *
 * Regio -> commissie -> e-mailadres staat hier op één plek.
 * Pas alleen deze tabel aan wanneer Caritas BOAZ de verdeling wijzigt.
 */

export type CommissieId = "bloemendaal-overveen" | "aerdenhout-zandvoort";

export const COMMISSIES: Record<
  CommissieId,
  { naam: string; email: string }
> = {
  "bloemendaal-overveen": {
    naam: "Commissie Bloemendaal/Overveen",
    email: "bloemendaal.overveen@caritasboaz.nl",
  },
  "aerdenhout-zandvoort": {
    naam: "Commissie Aerdenhout/Zandvoort",
    email: "aerdenhout.zandvoort@caritasboaz.nl",
  },
};

/** Plaats -> commissie. Uitbreiden of wijzigen kan hier. */
export const PLAATS_ROUTING = [
  { plaats: "Bloemendaal", commissie: "bloemendaal-overveen" },
  { plaats: "Overveen", commissie: "bloemendaal-overveen" },
  { plaats: "Aerdenhout", commissie: "aerdenhout-zandvoort" },
  { plaats: "Zandvoort", commissie: "aerdenhout-zandvoort" },
] as const satisfies ReadonlyArray<{ plaats: string; commissie: CommissieId }>;

export type Plaats = (typeof PLAATS_ROUTING)[number]["plaats"];

export function commissieVoorPlaats(plaats: string): CommissieId | null {
  const match = PLAATS_ROUTING.find((entry) => entry.plaats === plaats);
  return match ? match.commissie : null;
}

export const HULP_TYPES = [
  {
    value: "Individuele ondersteuning",
    hint: "Ondersteuning voor een persoon of gezin.",
  },
  {
    value: "Maatschappelijk project",
    hint: "Ondersteuning voor een project of welzijnsorganisatie.",
  },
  { value: "Anders", hint: "Past uw aanvraag hier niet in? Kies dan Anders." },
] as const;

export const UPLOAD = {
  maxFiles: 5,
  maxBytes: 8 * 1024 * 1024,
  accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
  types: ["pdf", "jpg", "jpeg", "png", "doc", "docx"],
};

/* ---------------------------------- state --------------------------------- */

export type AanvragerType = "persoon" | "organisatie";

export type AanvraagData = {
  aanvragerType: AanvragerType | "";
  organisatie: string;
  hulpverlenerNaam: string;
  hulpverlenerTelefoon: string;
  hulpverlenerEmail: string;
  eigenNaam: string;
  eigenTelefoon: string;
  eigenEmail: string;
  ontvangerNaam: string;
  ontvangerIban: string;
  plaats: string;
  hulpType: string;
  hulpOmschrijving: string;
  totaleKosten: string;
  eigenBijdrage: string;
  onderbouwing: string;
  bestanden: { name: string; size: number }[];
  datumOndertekening: string;
  handtekening: string;
  verklaring: boolean;
};

export const LEGE_AANVRAAG: AanvraagData = {
  aanvragerType: "",
  organisatie: "",
  hulpverlenerNaam: "",
  hulpverlenerTelefoon: "",
  hulpverlenerEmail: "",
  eigenNaam: "",
  eigenTelefoon: "",
  eigenEmail: "",
  ontvangerNaam: "",
  ontvangerIban: "",
  plaats: "",
  hulpType: "",
  hulpOmschrijving: "",
  totaleKosten: "",
  eigenBijdrage: "",
  onderbouwing: "",
  bestanden: [],
  datumOndertekening: "",
  handtekening: "",
  verklaring: false,
};

export function vandaagInNederland(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function formatDatum(input: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : input;
}

/* --------------------------------- bedragen -------------------------------- */

/** Zet invoer zoals "1.000,50" of "1000.5" om naar een getal in euro's. */
export function parseBedrag(input: string): number | null {
  const raw = input.replace(/[\s€]/g, "");
  if (!raw) return null;
  const normalised = raw.includes(",")
    ? raw.replace(/\./g, "").replace(",", ".")
    : raw;
  if (!/^\d+(\.\d{1,2})?$/.test(normalised)) return null;
  const value = Number(normalised);
  return Number.isFinite(value) ? value : null;
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function gevraagdeBijdrage(data: AanvraagData): number | null {
  const totaal = parseBedrag(data.totaleKosten);
  if (totaal === null) return null;
  const eigen = parseBedrag(data.eigenBijdrage) ?? 0;
  const rest = totaal - eigen;
  return rest < 0 ? null : Math.round(rest * 100) / 100;
}

/* ----------------------------------- IBAN ---------------------------------- */

export function normaliseerIban(input: string): string {
  return input.replace(/\s+/g, "").toUpperCase();
}

export function formatIban(input: string): string {
  return normaliseerIban(input).replace(/(.{4})/g, "$1 ").trim();
}

export function ibanIsGeldig(input: string): boolean {
  const iban = normaliseerIban(input);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(iban)) return false;
  const herschikt = iban.slice(4) + iban.slice(0, 4);
  const cijfers = herschikt
    .split("")
    .map((char) =>
      /[A-Z]/.test(char) ? String(char.charCodeAt(0) - 55) : char,
    )
    .join("");
  let rest = 0;
  for (const cijfer of cijfers) {
    rest = (rest * 10 + Number(cijfer)) % 97;
  }
  return rest === 1;
}

/* --------------------------------- validatie ------------------------------- */

export type StapId =
  | "voor-wie"
  | "aanvrager"
  | "ontvanger"
  | "regio"
  | "hulpvraag"
  | "kosten"
  | "onderbouwing"
  | "ondertekening"
  | "controleren";

export const STAPPEN: { id: StapId; kort: string; titel: string }[] = [
  { id: "voor-wie", kort: "Voor wie", titel: "Voor wie vraagt u ondersteuning aan?" },
  { id: "aanvrager", kort: "Aanvrager", titel: "Wie vraagt de ondersteuning aan?" },
  { id: "ontvanger", kort: "Ontvanger", titel: "Voor wie is de ondersteuning bedoeld?" },
  { id: "regio", kort: "Regio", titel: "Waar woont de persoon of waar is de organisatie gevestigd?" },
  { id: "hulpvraag", kort: "Hulpvraag", titel: "Waarvoor vraagt u ondersteuning aan?" },
  { id: "kosten", kort: "Kosten", titel: "Wat zijn de kosten?" },
  { id: "onderbouwing", kort: "Onderbouwing", titel: "Vertel ons iets meer over uw aanvraag" },
  { id: "ondertekening", kort: "Ondertekening", titel: "Datum & ondertekening" },
  { id: "controleren", kort: "Controleren", titel: "Controleer uw aanvraag" },
];

export type Fouten = Partial<Record<keyof AanvraagData, string>>;

const emailPatroon = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const telefoonPatroon = /^[0-9+()\s-]{6,20}$/;

export function valideerStap(stap: StapId, data: AanvraagData): Fouten {
  const fouten: Fouten = {};

  if (stap === "voor-wie" && !data.aanvragerType) {
    fouten.aanvragerType = "Maak een keuze om verder te gaan.";
  }

  if (stap === "aanvrager") {
    if (data.aanvragerType === "organisatie") {
      if (data.organisatie.trim().length < 2)
        fouten.organisatie = "Vul de naam van de organisatie in.";
      if (data.hulpverlenerNaam.trim().length < 2)
        fouten.hulpverlenerNaam = "Vul de naam van de hulpverlener in.";
      if (!telefoonPatroon.test(data.hulpverlenerTelefoon.trim()))
        fouten.hulpverlenerTelefoon =
          "Vul een telefoonnummer in, bijvoorbeeld 023 123 4567.";
      if (!emailPatroon.test(data.hulpverlenerEmail.trim()))
        fouten.hulpverlenerEmail =
          "Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.";
    } else {
      if (data.eigenNaam.trim().length < 2)
        fouten.eigenNaam = "Vul uw naam in om verder te gaan.";
      if (!telefoonPatroon.test(data.eigenTelefoon.trim()))
        fouten.eigenTelefoon =
          "Vul een telefoonnummer in, bijvoorbeeld 023 123 4567.";
      if (!emailPatroon.test(data.eigenEmail.trim()))
        fouten.eigenEmail =
          "Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.";
    }
  }

  if (stap === "ontvanger") {
    if (data.ontvangerNaam.trim().length < 2)
      fouten.ontvangerNaam = "Vul voorletter(s) en achternaam in.";
    if (!data.ontvangerIban.trim()) {
      fouten.ontvangerIban = "Vul het IBAN van de ontvanger in.";
    } else if (!ibanIsGeldig(data.ontvangerIban)) {
      fouten.ontvangerIban =
        "Controleer het IBAN-nummer. Een Nederlands IBAN begint met NL.";
    }
  }

  if (stap === "regio" && !commissieVoorPlaats(data.plaats)) {
    fouten.plaats = "Kies een plaats om verder te gaan.";
  }

  if (stap === "hulpvraag") {
    if (!data.hulpType) fouten.hulpType = "Kies waarvoor u ondersteuning vraagt.";
    if (data.hulpOmschrijving.trim().length < 10)
      fouten.hulpOmschrijving =
        "Beschrijf kort waarvoor u ondersteuning vraagt. Een paar regels is genoeg.";
  }

  if (stap === "kosten") {
    const totaal = parseBedrag(data.totaleKosten);
    if (totaal === null) {
      fouten.totaleKosten = "Vul de totale kosten in, bijvoorbeeld 1000.";
    }
    const eigen = data.eigenBijdrage.trim()
      ? parseBedrag(data.eigenBijdrage)
      : 0;
    if (eigen === null) {
      fouten.eigenBijdrage =
        "Vul een bedrag in, bijvoorbeeld 250. Heeft u geen eigen bijdrage? Vul dan 0 in.";
    } else if (totaal !== null && eigen > totaal) {
      fouten.eigenBijdrage =
        "De eigen bijdrage kan niet hoger zijn dan de totale kosten.";
    }
  }

  if (stap === "onderbouwing" && data.onderbouwing.trim().length < 10) {
    fouten.onderbouwing =
      "Vertel kort waarom deze ondersteuning nodig is. Een paar regels is genoeg.";
  }

  if (stap === "ondertekening") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.datumOndertekening)) {
      fouten.datumOndertekening = "Vul een geldige datum in.";
    }
    if (data.handtekening.trim().length < 2) {
      fouten.handtekening = "Vul uw volledige naam in als ondertekening.";
    }
  }

  if (stap === "controleren" && !data.verklaring) {
    fouten.verklaring =
      "Vink de verklaring aan om de aanvraag te kunnen verzenden.";
  }

  return fouten;
}

export function stapIsCompleet(stap: StapId, data: AanvraagData): boolean {
  return Object.keys(valideerStap(stap, data)).length === 0;
}

/* --------------------------- samenvatting voor mail ------------------------ */

export type AanvraagSamenvatting = {
  commissie: { id: CommissieId; naam: string; email: string };
  secties: { titel: string; regels: { label: string; waarde: string }[] }[];
};

export function maakSamenvatting(
  data: AanvraagData,
): AanvraagSamenvatting | null {
  const commissieId = commissieVoorPlaats(data.plaats);
  if (!commissieId) return null;
  const gevraagd = gevraagdeBijdrage(data);
  const totaal = parseBedrag(data.totaleKosten);
  const eigen = parseBedrag(data.eigenBijdrage) ?? 0;

  const aanvrager =
    data.aanvragerType === "organisatie"
      ? [
          { label: "Organisatie", waarde: data.organisatie.trim() },
          { label: "Hulpverlener", waarde: data.hulpverlenerNaam.trim() },
          { label: "Telefoonnummer", waarde: data.hulpverlenerTelefoon.trim() },
          { label: "E-mailadres", waarde: data.hulpverlenerEmail.trim() },
        ]
      : [
          { label: "Naam", waarde: data.eigenNaam.trim() },
          { label: "Telefoonnummer", waarde: data.eigenTelefoon.trim() },
          { label: "E-mailadres", waarde: data.eigenEmail.trim() },
        ];

  return {
    commissie: { id: commissieId, ...COMMISSIES[commissieId] },
    secties: [
      { titel: "Aanvrager", regels: aanvrager },
      {
        titel: "Ontvanger",
        regels: [
          { label: "Naam", waarde: data.ontvangerNaam.trim() },
          { label: "IBAN", waarde: formatIban(data.ontvangerIban) },
        ],
      },
      {
        titel: "Regio",
        regels: [
          { label: "Plaats", waarde: data.plaats },
          { label: "Commissie", waarde: COMMISSIES[commissieId].naam },
        ],
      },
      {
        titel: "Hulpvraag",
        regels: [
          { label: "Type ondersteuning", waarde: data.hulpType },
          { label: "Toelichting", waarde: data.hulpOmschrijving.trim() },
        ],
      },
      {
        titel: "Kosten",
        regels: [
          {
            label: "Totale kosten",
            waarde: totaal === null ? "-" : formatEuro(totaal),
          },
          { label: "Eigen bijdrage", waarde: formatEuro(eigen) },
          {
            label: "Gevraagde bijdrage Caritas BOAZ",
            waarde: gevraagd === null ? "-" : formatEuro(gevraagd),
          },
        ],
      },
      {
        titel: "Onderbouwing",
        regels: [{ label: "Toelichting", waarde: data.onderbouwing.trim() }],
      },
      {
        titel: "Bijlagen",
        regels: data.bestanden.length
          ? data.bestanden.map((file, index) => ({
              label: `Bestand ${index + 1}`,
              waarde: file.name,
            }))
          : [{ label: "Bijlagen", waarde: "Geen bijlagen toegevoegd" }],
      },
      {
        titel: "Datum & ondertekening",
        regels: [
          { label: "Datum", waarde: formatDatum(data.datumOndertekening) },
          { label: "Ondertekend door", waarde: data.handtekening.trim() },
        ],
      },
    ],
  };
}
