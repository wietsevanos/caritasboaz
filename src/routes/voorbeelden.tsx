import { createFileRoute } from "@tanstack/react-router";
import {
  Container,
  ButtonLink,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/site/primitives";

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
    label: "Individuele hulp",
    text: "Financiële hulp bij de aanschaf van huishoudelijke apparatuur.",
    tone: "bg-sky",
    span: "sm:col-span-7",
    size: "text-2xl sm:text-3xl",
  },
  {
    label: "Jeugd en ontmoeting",
    text: "Ondersteuning om deelname aan een lokaal jeugdkamp mogelijk te maken.",
    tone: "bg-background border border-border",
    span: "sm:col-span-5",
    size: "text-xl sm:text-2xl",
  },
  {
    label: "Buurt en samenleving",
    text: "Ondersteuning van een initiatief voor ouderen en kinderen.",
    tone: "bg-sand",
    span: "sm:col-span-5",
    size: "text-xl sm:text-2xl",
  },
];

function Voorbeelden() {
  return (
    <>
      <Section tone="white" className="pb-12 pt-12 sm:pb-16 sm:pt-16">
        <Container>
          <Reveal>
            <Eyebrow>Voorbeelden</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[2.1rem] sm:text-[3rem] lg:text-[3.3rem]">
              Voorbeelden van ondersteuning
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
              Caritas BOAZ ondersteunt mensen en initiatieven op verschillende
              manieren. Om privacy te beschermen worden persoonlijke situaties
              altijd anoniem weergegeven.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-12">
            {ITEMS.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 90}
                className={`group rounded-sm p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 sm:p-10 ${item.tone} ${item.span}`}
              >
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                  {item.label}
                </p>
                <p
                  className={`mt-5 font-display font-semibold leading-snug ${item.size}`}
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
          <div className="mt-9 flex flex-col items-start gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-muted-foreground">De overige voorbeelden worden later aangevuld. Persoonlijke situaties blijven altijd anoniem.</p>
            <ButtonLink to="/hulp-aanvragen">Hulp aanvragen</ButtonLink>
          </div>
        </Container>
      </Section>

    </>
  );
}
