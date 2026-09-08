import { createFileRoute } from "@tanstack/react-router";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
  Statement,
} from "@/components/site/primitives";
import { HeroVisual, LineField } from "@/components/site/visuals";
import { AcuteNoodBlock } from "@/components/site/AcuteNoodBlock";
import { HelpCta } from "@/components/site/HelpCta";
import { EXAMPLES, PLACES } from "@/lib/site";

const TITLE = "Caritas BOAZ — samen helpen wanneer hulp nodig is";
const DESCRIPTION =
  "Caritas BOAZ biedt ondersteuning aan mensen in tijdelijke financiële of persoonlijke nood in Bloemendaal, Overveen, Aerdenhout en Zandvoort.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Home,
});

const HELP_ITEMS = [
  {
    number: "01",
    title: "Tijdelijke financiële ondersteuning",
    text: "Voor mensen die tijdelijk financiële problemen ervaren en niet voldoende geholpen kunnen worden door reguliere instanties.",
    accent: "bg-primary",
  },
  {
    number: "02",
    title: "Persoonlijke nood",
    text: "Aandacht en ondersteuning voor mensen die in een moeilijke of benarde situatie terecht zijn gekomen.",
    accent: "bg-sage-strong",
  },
  {
    number: "03",
    title: "Maatschappelijke projecten",
    text: "Ondersteuning van lokale initiatieven die bijdragen aan het welzijn van mensen binnen de regio.",
    accent: "bg-sky-strong",
  },
  {
    number: "04",
    title: "Acute nood",
    text: "Bij acute persoonlijke of sociale nood kan contact worden opgenomen met de juiste contactpersoon.",
    accent: "bg-clay",
  },
];

const VALUES = [
  {
    word: "Praktisch",
    text: "We kijken naar concrete mogelijkheden om te helpen.",
  },
  {
    word: "Persoonlijk",
    text: "Achter iedere hulpvraag staat een mens en een verhaal.",
  },
  { word: "Betrokken", text: "We geloven in naar elkaar omkijken." },
];

const EXAMPLE_TONES = [
  "bg-background border border-border",
  "bg-sky",
  "bg-sage",
  "bg-sand",
];

function Home() {
  return (
    <>
      {/* Hero */}
      <Section tone="white" className="pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <Reveal>
              <Eyebrow className="hidden sm:block">
                Bloemendaal · Overveen · Aerdenhout · Zandvoort
              </Eyebrow>
              <div className="flex items-center gap-3 sm:hidden">
                <span
                  className="h-px w-7 bg-clay"
                  aria-hidden="true"
                />
                <span className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                  Ondersteuning dichtbij huis
                </span>
              </div>
              <h1 className="mt-6 text-[2.15rem] sm:text-[3.1rem] lg:text-[3.6rem]">
                  Samen helpen wanneer hulp nodig is.
                </h1>
                <p className="mt-6 max-w-xl text-muted-foreground sm:text-lg">
                  Caritas BOAZ biedt ondersteuning aan mensen in tijdelijke
                  financiële of persoonlijke nood in Bloemendaal, Overveen,
                  Aerdenhout en Zandvoort.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-9 grid gap-3 sm:max-w-[30rem] sm:grid-cols-2">
                  <ButtonLink to="/hulp-aanvragen" className="w-full">
                    Hulp aanvragen
                  </ButtonLink>
                  <ButtonLink to="/over-ons" variant="outline" className="w-full">
                    Meer over Caritas BOAZ
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <HeroVisual />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Introductie */}
      <Section tone="sky" labelledBy="introductie">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <Eyebrow>Introductie</Eyebrow>
              <h2 id="introductie" className="mt-5 text-[1.9rem] sm:text-4xl lg:text-[2.7rem]">
                Er voor mensen in onze omgeving.
              </h2>
              <p className="mt-6 max-w-xl text-muted-foreground sm:text-lg">
                Soms komt iemand tijdelijk in een situatie terecht waarin
                financiële of persoonlijke hulp nodig is. Caritas BOAZ kijkt waar
                zij kan helpen en ondersteunt mensen en initiatieven wanneer
                andere mogelijkheden niet voldoende zijn.
              </p>
            </Reveal>
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-soft">
                BOAZ staat voor
              </p>
              <ul className="mt-6 border-t border-primary/15">
                {PLACES.map((place, i) => (
                  <Reveal
                    as="li"
                    key={place}
                    delay={i * 90}
                    className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 border-b border-primary/15 py-5 transition-colors hover:bg-background/50"
                  >
                    <span className="font-display text-2xl font-semibold text-primary/35 transition-colors group-hover:text-clay sm:text-3xl">
                      0{i + 1}
                    </span>
                    <span className="font-display text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                      {place}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Waar wij kunnen helpen */}
      <Section tone="white" labelledBy="waar-wij-helpen">
        <Container>
          <SectionHeading
            id="waar-wij-helpen"
            eyebrow="Wat wij doen"
            title="Waar wij kunnen helpen"
          />
          <ul className="mt-14 space-y-px">
            {HELP_ITEMS.map((item, i) => (
              <Reveal
                as="li"
                key={item.number}
                delay={i * 80}
                className="group relative border-t border-border py-8 last:border-b sm:py-10"
              >
                <span
                  className={`absolute left-0 top-0 h-px w-0 transition-[width] duration-500 ease-out group-hover:w-full ${item.accent}`}
                  aria-hidden="true"
                />
                <div
                  className={`grid gap-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-10 ${
                    i % 2 === 1 ? "lg:pl-24" : ""
                  }`}
                >
                  <span className="font-display text-3xl font-semibold text-border-strong transition-colors duration-300 group-hover:text-foreground sm:text-4xl">
                    {item.number}
                  </span>
                  <div className="max-w-2xl transition-transform duration-300 group-hover:translate-x-1">
                    <h3 className="text-xl sm:text-2xl">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Waarom Caritas BOAZ */}
      <Section tone="sand" labelledBy="waarom">
        <LineField className="opacity-70" stroke="var(--clay)" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow className="text-clay">Waarom Caritas BOAZ</Eyebrow>
              <Statement as="h2" id="waarom" className="mt-5">
                Niemand zou er alleen voor moeten staan.
              </Statement>
              <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
                Caritas BOAZ zet zich in voor mensen die tijdelijk extra
                ondersteuning kunnen gebruiken. Vanuit betrokkenheid bij de
                lokale gemeenschap kijken we naar wat nodig is en waar we
                praktisch kunnen helpen.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {VALUES.map((value, i) => (
              <Reveal
                key={value.word}
                delay={i * 110}
                className={`border-l-2 border-clay/40 pl-5 sm:pl-6 ${
                  i === 1 ? "sm:mt-10" : i === 2 ? "sm:mt-20" : ""
                }`}
              >
                <h3 className="font-display text-2xl font-semibold sm:text-[1.75rem]">
                  {value.word}
                </h3>
                <p className="mt-3 text-muted-foreground">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Voorbeelden preview */}
      <Section tone="white" labelledBy="voorbeelden-preview">
        <Container>
          <SectionHeading
            id="voorbeelden-preview"
            eyebrow="Voorbeelden"
            title="Een greep uit wat wij doen."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-6">
            {EXAMPLES.map((example, i) => (
              <Reveal
                key={example.label}
                delay={i * 90}
                className={[
                  "group rounded-sm p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 sm:p-8",
                  EXAMPLE_TONES[i],
                  i === 0
                    ? "sm:col-span-4"
                    : i === 1
                      ? "sm:col-span-2"
                      : i === 2
                        ? "sm:col-span-2"
                        : "sm:col-span-4",
                ].join(" ")}
              >
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                  {example.label}
                </p>
                <p className="mt-4 font-display text-lg font-medium sm:text-xl">
                  {example.text}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-muted-foreground">
              Om privacy te beschermen worden situaties en projecten anoniem
              weergegeven.
            </p>
            <ButtonLink to="/voorbeelden" variant="outline">
              Bekijk alle voorbeelden
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <AcuteNoodBlock />
      <HelpCta />
    </>
  );
}
