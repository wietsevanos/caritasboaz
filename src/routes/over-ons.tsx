import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import bloemendaalAsset from "@/assets/regions/bloemendaal.png.asset.json";
import overveenAsset from "@/assets/regions/overveen.png.asset.json";
import aerdenhoutAsset from "@/assets/regions/aerdenhout.png.asset.json";
import zandvoortAsset from "@/assets/regions/zandvoort.png.asset.json";
import helpingHandsAsset from "@/assets/helping-hands.png.asset.json";
import {
  Container,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
  Statement,
} from "@/components/site/primitives";
import { LineField } from "@/components/site/visuals";
import { HelpCta } from "@/components/site/HelpCta";

const TITLE = "Over Caritas BOAZ — charitatieve hulp in de regio";
const DESCRIPTION =
  "Caritas BOAZ is een charitatieve instelling met rooms-katholieke achtergrond, met eigen bestuur en financieel beheer, actief in Bloemendaal, Overveen, Aerdenhout en Zandvoort.";

export const Route = createFileRoute("/over-ons")({
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
  component: OverOns,
});

const FACTS = [
  {
    title: "Eigen bestuur",
    text: "Caritas BOAZ is een kerkelijke rechtspersoon met een eigen bestuur dat de koers en de besluiten bepaalt.",
  },
  {
    title: "Zelfstandig financieel beheer",
    text: "De organisatie beheert haar middelen zelfstandig en zorgvuldig, met een sociaal-charitatieve doelstelling.",
  },
  {
    title: "Sociaal-charitatief werk",
    text: "Wij ondersteunen mensen én lokale initiatieven die bijdragen aan het welzijn binnen de gemeenschap.",
  },
  {
    title: "Voor mensen in tijdelijke nood",
    text: "Wij helpen mensen met beperkte financiële middelen en mensen die tijdelijk extra ondersteuning nodig hebben.",
  },
];

const CORE_VALUES = [
  {
    title: "Praktisch helpen",
    text: "We kijken naar wat concreet mogelijk is en handelen waar dat nodig is.",
  },
  {
    title: "Persoonlijke aandacht",
    text: "Achter iedere hulpvraag staat een mens met een eigen verhaal.",
  },
  {
    title: "Vertrouwelijk en respectvol",
    text: "Informatie wordt zorgvuldig en vertrouwelijk behandeld.",
  },
  {
    title: "Samen betrokken",
    text: "We geloven in naar elkaar omkijken binnen de lokale gemeenschap.",
  },
];

const REGIONS = [
  {
    name: "Bloemendaal",
    image: bloemendaalAsset.url,
    position: "object-center",
  },
  {
    name: "Overveen",
    image: overveenAsset.url,
    position: "object-center",
  },
  {
    name: "Aerdenhout",
    image: aerdenhoutAsset.url,
    position: "object-center",
  },
  {
    name: "Zandvoort",
    image: zandvoortAsset.url,
    position: "object-center",
  },
] as const;

function OverOns() {
  return (
    <>
      <Section tone="white" className="pb-12 pt-12 sm:pb-16 sm:pt-16">
        <Container>
          <Reveal>
            <Eyebrow>Over ons</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[2.1rem] sm:text-[3rem] lg:text-[3.4rem]">
              Over Caritas BOAZ
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
              Caritas BOAZ is een charitatieve instelling van de rooms-katholieke
              geloofsgemeenschap die hulp biedt aan mensen in nood. Wij zetten
              ons in voor mensen die te maken hebben met tijdelijke financiële of
              persoonlijke nood.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((region) => (
              <Link
                key={region.name}
                to="/contact"
                aria-label={`Contact voor ${region.name}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-muted focus-visible:outline-offset-4"
              >
                <img
                  src={region.image}
                  alt={`Omgeving van ${region.name}`}
                  loading="lazy"
                  className={`h-full w-full object-cover ${region.position} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-footer/90 via-footer/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 p-5 text-footer-foreground sm:p-6">
                  <h2 className="min-w-0 truncate text-xl font-semibold">
                    {region.name}
                  </h2>
                  <span className="grid size-9 shrink-0 place-items-center border border-footer-foreground/45 transition-colors duration-300 group-hover:bg-footer-foreground group-hover:text-footer">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section tone="sky">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <Statement as="h2">
                Naar elkaar omkijken, dichtbij en concreet.
              </Statement>
            </Reveal>
            <div className="space-y-px">
              {FACTS.map((fact, i) => (
                <Reveal
                  key={fact.title}
                  delay={i * 80}
                  className="group border-t border-primary/15 py-6 last:border-b"
                >
                  <h3 className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    {fact.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-muted-foreground">
                    {fact.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Onze uitgangspunten"
            title="Waar wij voor staan"
            intro="Vier uitgangspunten bepalen hoe wij naar hulpvragen kijken en hoe wij werken."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-10">
            {CORE_VALUES.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 100}
                className={`rounded-sm border border-border p-7 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-9 ${
                  i % 2 === 1 ? "sm:mt-10" : ""
                } ${i === 3 ? "bg-sage/60" : i === 0 ? "bg-sand/60" : "bg-background"}`}
              >
                <span className="font-display text-sm font-semibold text-primary-soft">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-xl sm:text-2xl">{value.title}</h3>
                <p className="mt-3 text-muted-foreground">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <LineField stroke="var(--clay)" />
        <Container size="narrow" className="relative text-center">
          <Reveal>
            <Statement>Caritas BOAZ zijn we samen.</Statement>
            <p className="mt-6 text-muted-foreground sm:text-lg">
              Vanuit betrokkenheid bij de lokale gemeenschap ondersteunen wij
              mensen en initiatieven wanneer reguliere instanties niet
              voldoende kunnen helpen.
            </p>
          </Reveal>
        </Container>
      </Section>

      <HelpCta />
    </>
  );
}
