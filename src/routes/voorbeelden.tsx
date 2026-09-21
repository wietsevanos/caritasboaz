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
    span: "md:col-span-8",
    tone: "border border-border-strong bg-background",
  },
  {
    label: "Persoonlijke ondersteuning",
    text: "Een schenking voor de aanschaf van een stofzuiger voor een statushouder.",
    span: "md:col-span-4",
    tone: "bg-sky",
  },
  {
    label: "Persoonlijke ondersteuning",
    text: "Financiële ondersteuning bij minder inkomsten vanwege een operatie.",
    span: "md:col-span-4",
    tone: "bg-sage",
  },
  {
    label: "Wonen",
    text: "Een donatie voor een laminaatvloer.",
    span: "md:col-span-8",
    tone: "bg-sand",
  },
  {
    label: "Jeugd",
    text: "Financiële ondersteuning voor jeugdproject Timmerdorp Bloemendaal.",
    span: "md:col-span-6",
    tone: "bg-sky",
  },
  {
    label: "Ontmoeting",
    text: "Financiële ondersteuning voor een tuinproject voor ouderen en kinderen in Vogelenzang.",
    span: "md:col-span-6",
    tone: "border border-border-strong bg-background",
  },
  {
    label: "Lokale goede doelen",
    text: "Jaarlijkse donaties aan verschillende goede doelen, waaronder Stem in de Stad, FUN en Youth for Christ.",
    span: "md:col-span-5",
    tone: "bg-sand",
  },
  {
    label: "Zandvoort",
    text: "Gevulde rugzakjes voor de jeugd in de zomer en financiële ondersteuning voor gezinnen die dat nodig hebben rond Kerst en Pasen.",
    span: "md:col-span-7",
    tone: "bg-sage",
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

      <Section tone="white" className="pt-12 sm:pt-16 lg:pt-20">
        <Container>
          <Reveal>
            <Eyebrow>Voorbeelden</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-[2.6rem]">
              Een greep uit wat wij doen.
            </h2>
          </Reveal>

          <div className="mt-10 grid auto-rows-fr gap-4 md:grid-cols-12 sm:mt-12">
            {ITEMS.map((item, i) => (
              <Reveal
                key={item.text}
                delay={i * 90}
                className={`group min-h-48 rounded-sm p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 lg:min-h-52 ${item.span} ${item.tone}`}
              >
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                  {item.label}
                </p>
                <p
                  className="mt-5 font-display text-xl font-semibold leading-snug sm:text-2xl"
                >
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Om privacy te beschermen worden persoonlijke situaties altijd anoniem weergegeven.
            </p>
            <ButtonLink to="/hulp-aanvragen" variant="outline" className="w-full sm:w-auto">
              Hulp aanvragen
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
      <HelpCtaSection title="Heeft u zelf ondersteuning nodig?" />

    </>
  );
}
