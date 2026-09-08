export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/over-ons", label: "Over ons" },
  { to: "/geschiedenis", label: "Geschiedenis" },
  { to: "/voorbeelden", label: "Voorbeelden" },
  { to: "/contact", label: "Contact" },
] as const;

export const PLACES = [
  "Bloemendaal",
  "Overveen",
  "Aerdenhout",
  "Zandvoort",
] as const;

export const ACUTE_CONTACT = {
  name: "Diaken Gert-Jan van der Wal",
  phone: "06-43223690",
  phoneHref: "tel:+31643223690",
  email: "gertjanvanderwal@live.nl",
} as const;

export const EXAMPLES = [
  {
    label: "Individuele ondersteuning",
    text: "Tijdelijke financiële hulp bij noodzakelijke kosten.",
  },
  {
    label: "Jeugd en ontmoeting",
    text: "Ondersteuning om deelname aan een lokaal jeugdkamp mogelijk te maken.",
  },
  {
    label: "Buurt en samenleving",
    text: "Ondersteuning van een lokaal initiatief voor ouderen en kinderen.",
  },
  {
    label: "Acute nood",
    text: "Tijdelijke ondersteuning in een onverwachte moeilijke situatie.",
  },
] as const;
