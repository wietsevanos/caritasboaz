import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/site/primitives";
import togetherIllustrationAsset from "@/assets/caritas-samen-in-verbinding.png.asset.json";
import generationsTogetherAsset from "@/assets/generations-together.jpg";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const HELP_ITEMS = [
  {
    title: "Tijdelijke persoonlijke ondersteuning",
    text: "Voor mensen die tijdelijk financiële problemen ervaren en niet voldoende geholpen kunnen worden door reguliere instanties.",
  },
  {
    title: "Maatschappelijke projecten",
    text: "Ondersteuning van lokale initiatieven die bijdragen aan het welzijn van mensen binnen de regio.",
  },
];

const BOAZ_PLACES = [
  { letter: "B", place: "Bloemendaal" },
  { letter: "O", place: "Overveen" },
  { letter: "A", place: "Aerdenhout" },
  { letter: "Z", place: "Zandvoort" },
] as const;

function Home() {
  return (
    <>
      {/* Hero */}
      <Section tone="sky" className="bg-sky/55 pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
        <Container size="wide">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
            <div className="min-w-0 lg:py-5">
              <Reveal>
                <Eyebrow className="text-clay">Voor mensen in nood</Eyebrow>
                <h1 className="mt-5 text-[2.7rem] leading-[1.04] tracking-normal sm:mt-6 sm:text-[3.65rem] lg:text-[3.75rem] xl:text-[4.35rem]">
                  <span className="block sm:whitespace-nowrap">Samen helpen</span>
                  <span className="block">wanneer</span>
                  <span className="block whitespace-nowrap">hulp nodig is<span className="text-clay">.</span></span>
                </h1>
                <p className="mt-6 max-w-[35rem] text-muted-foreground sm:text-lg">
                  Caritas BOAZ biedt ondersteuning aan mensen in tijdelijke financiële of persoonlijke nood in Bloemendaal, Overveen, Aerdenhout en Zandvoort en omstreken.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-8 sm:max-w-[14rem]">
                  <ButtonLink to="/hulp-aanvragen" className="w-full group">
                    Hulp aanvragen
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-9 border-t border-primary/15 pt-5" aria-label="BOAZ staat voor Bloemendaal, Overveen, Aerdenhout en Zandvoort">
                  <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary-soft">
                    BOAZ staat voor
                  </p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                    {BOAZ_PLACES.map(({ letter, place }) => (
                      <div key={letter} className="group flex min-w-0 items-center gap-2 py-1">
                        <dt className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-clay-soft font-display text-sm font-bold text-clay transition-[background-color,color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:bg-clay group-hover:text-primary-foreground">
                          {letter}
                        </dt>
                        <dd className="min-w-0 text-[0.78rem] font-semibold text-foreground transition-colors duration-200 group-hover:text-clay sm:text-sm">
                          {place}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
            <Reveal delay={160} className="relative min-w-0">
              <div className="relative overflow-hidden rounded-sm bg-sky sm:mx-0">
                <div className="absolute inset-x-[8%] top-[9%] h-px bg-primary/10" aria-hidden="true" />
                <div className="absolute bottom-[10%] left-[6%] h-20 w-20 rounded-sm bg-sage/65" aria-hidden="true" />
                <img
                  src={togetherIllustrationAsset.url}
                  alt="Mensen die elkaar steunen"
                  className="relative z-10 aspect-[6/5] w-full object-contain object-center sm:aspect-[7/5] lg:aspect-[6/5] lg:scale-[1.04]"
                  loading="eager"
                  fetchPriority="high"
                  width="1024"
                  height="1024"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Introductie */}
      <Section tone="sky" labelledBy="introductie">
        <Container>
          <div className="max-w-3xl">
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
          </div>
        </Container>
      </Section>

      {/* Wat wij doen */}
      <Section tone="white" labelledBy="wat-wij-doen">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Wat wij doen</Eyebrow>
                <h2 id="wat-wij-doen" className="mt-4 text-[1.8rem] sm:text-4xl lg:text-[2.6rem]">
                  Ondersteuning dichtbij
                </h2>
              </Reveal>
              <div className="mt-9 border-t border-border">
                {HELP_ITEMS.map((item, i) => (
                  <Reveal key={item.title} delay={i * 80} className="border-b border-border py-6">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground">{item.text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={120}>
              <img src={generationsTogetherAsset} alt="Kinderen, volwassenen en ouderen samen" className="aspect-[16/10] w-full rounded-sm object-cover" loading="lazy" width={1600} height={912} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Voorbeelden preview */}
      <Section tone="sky" labelledBy="voorbeelden-preview" className="bg-sky/45">
        <Container>
          <Reveal className="grid gap-7 border-y border-border py-9 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:py-11">
            <div>
              <Eyebrow>Voorbeelden</Eyebrow>
              <h2 id="voorbeelden-preview" className="mt-4 text-[1.8rem] sm:text-4xl">
                Bekijk voorbeelden van hulp die Caritas BOAZ biedt.
              </h2>
            </div>
            <ButtonLink to="/voorbeelden" variant="outline" className="w-full sm:w-auto">
              Bekijk voorbeelden
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
