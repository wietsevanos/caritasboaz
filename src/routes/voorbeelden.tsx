import { createFileRoute } from "@tanstack/react-router";
import {
  Container,
  ButtonLink,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/site/primitives";
import { HelpCtaSection } from "@/components/site/HelpCtaSection";
import helpingHandsAsset from "@/assets/helping-hands.png.asset.json";

const TITLE = "Voorbeelden van ondersteuning — Caritas BOAZ";
const DESCRIPTION =
  "Anonieme voorbeelden van de manieren waarop Caritas BOAZ mensen en lokale initiatieven ondersteunt.";

export const Route = createFileRoute("/voorbeelden")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Voorbeelden,
});

const ITEMS = [
  {
    label: "Persoonlijke ondersteuning",
    text: "Financiële hulp bij de aanschaf van huishoudelijke apparatuur.",
    span: "sm:col-span-5",
  },
  {
    label: "Persoonlijke ondersteuning",
    text: "Een schenking voor de aanschaf van een stofzuiger voor een statushouder.",
    span: "sm:col-span-7",
  },
  {
    label: "Persoonlijke ondersteuning",
    text: "Financiële ondersteuning bij minder inkomsten vanwege een operatie.",
    span: "sm:col-span-5",
  },
  {
    label: "Wonen",
    text: "Een donatie voor een laminaatvloer.",
    span: "sm:col-span-5",
  },
  {
    label: "Jeugd",
    text: "Financiële ondersteuning voor jeugdproject Timmerdorp Bloemendaal.",
    span: "sm:col-span-7",
  },
  {
    label: "Ontmoeting",
    text: "Financiële ondersteuning voor een tuinproject voor ouderen en kinderen in Vogelenzang.",
    span: "sm:col-span-7",
  },
  {
    label: "Lokale goede doelen",
    text: "Jaarlijkse donaties aan verschillende goede doelen, waaronder Stem in de Stad, FUN en Youth for Christ.",
    span: "sm:col-span-5",
  },
  {
    label: "Zandvoort",
    text: "Gevulde rugzakjes voor de jeugd in de zomer en financiële ondersteuning voor gezinnen die dat nodig hebben rond Kerst en Pasen.",
    span: "sm:col-span-12",
  },
];

function Voorbeelden() {
  return (
    <>
      <Section tone="white" className="pb-14 pt-12 sm:pb-20 sm:pt-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] lg:gap-16">
            <Reveal><Eyebrow>Voorbeelden</Eyebrow><h1 className="mt-6 max-w-3xl text-[2.1rem] sm:text-[3rem] lg:text-[3.3rem]">Voorbeelden van ondersteuning</h1><p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">Caritas BOAZ ondersteunt mensen en initiatieven op verschillende manieren. Om privacy te beschermen worden persoonlijke situaties altijd anoniem weergegeven.</p></Reveal>
            <Reveal delay={120}><img src={helpingHandsAsset.url} alt="Handen die ondersteuning bieden" className="aspect-[4/3] w-full rounded-sm object-cover" width="1024" height="1024" /></Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="sky">
        <Container>
          <div className="grid gap-4 sm:grid-cols-12">
            {ITEMS.map((item, i) => (
              <Reveal
                key={item.text}
                delay={i * 90}
                className={`group rounded-sm border border-primary/10 bg-background p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 sm:p-9 lg:p-10 ${item.span}`}
              >
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                  {item.label}
                </p>
                <p
                  className="mt-5 font-display text-xl font-semibold leading-snug sm:text-2xl"
                >
                  {item.text}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-7 block h-px w-12 bg-primary/30 transition-all duration-500 group-hover:w-24"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sage" className="py-14 sm:py-18">
        <Container>
          <Reveal className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div><Eyebrow>Zorgvuldig gedeeld</Eyebrow><h2 className="mt-4 text-2xl sm:text-3xl">Privacy staat voorop</h2><p className="mt-4 max-w-2xl text-muted-foreground">Deze voorbeelden laten concreet zien welke ondersteuning is geboden. Persoonlijke situaties blijven altijd anoniem.</p></div>
            <ButtonLink to="/hulp-aanvragen" variant="outline" className="w-full sm:w-auto">Hulp aanvragen</ButtonLink>
          </Reveal>
        </Container>
      </Section>
      <HelpCtaSection title="Heeft u zelf ondersteuning nodig?" />

    </>
  );
}
