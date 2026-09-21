import { createFileRoute } from "@tanstack/react-router";
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

function Home() {
  return (
    <>
      {/* Hero */}
      <Section tone="white" className="pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-stretch lg:gap-10">
            <div>
              <Reveal>
              <Eyebrow className="hidden text-clay sm:block">
                Voor mensen in nood
              </Eyebrow>
              <Eyebrow className="text-clay sm:hidden">
                Voor mensen in nood
              </Eyebrow>
              <h1 className="mt-6 text-[2.15rem] sm:text-[3.1rem] lg:text-[3.6rem]">
                  Samen helpen wanneer hulp nodig is.
                </h1>
                <p className="mt-6 max-w-xl text-muted-foreground sm:text-lg">
                  Caritas BOAZ biedt ondersteuning aan mensen in tijdelijke
                  financiële of persoonlijke nood in <strong className="font-semibold text-clay">B</strong>loemendaal, <strong className="font-semibold text-clay">O</strong>verveen, <strong className="font-semibold text-clay">A</strong>erdenhout en <strong className="font-semibold text-clay">Z</strong>andvoort en omstreken.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-9 sm:max-w-[15rem]">
                  <ButtonLink to="/hulp-aanvragen" className="w-full">
                    Hulp aanvragen
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200} className="flex flex-col">
              <img
                src={togetherIllustrationAsset.url}
                alt="Mensen die elkaar steunen"
                className="w-full rounded-sm object-cover lg:h-full"
                loading="eager"
                width="1024"
                height="1024"
              />
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
