import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow, Reveal, Section } from "@/components/site/primitives";
import { LineField } from "@/components/site/visuals";
import { HelpCtaSection } from "@/components/site/HelpCtaSection";

const TITLE = "Contact — Caritas BOAZ";
const DESCRIPTION =
  "Contactgegevens van Caritas BOAZ voor Bloemendaal en Overveen en voor Aerdenhout en Zandvoort.";

export const Route = createFileRoute("/contact")({
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
  component: Contact,
});

const REGIONS = [
  {
    label: "Bloemendaal en Overveen",
    email: "bloemendaal.overveen@caritasboaz.nl",
    iban: "NL39 ABNA 0543 7729 34",
    holder: "t.n.v. PCI Caritas BOAZ",
    rsin: "825651591",
    tone: "bg-sky",
  },
  {
    label: "Aerdenhout en Zandvoort",
    email: "aerdenhout.zandvoort@caritasboaz.nl",
    iban: "NL16 ABNA 0115307664",
    holder: "t.n.v. PCI Caritas BOAZ inzake Agatha Parochie",
    rsin: "825651591",
    tone: "bg-sage",
  },
];

function Contact() {
  return (
    <>
      <Section tone="white" className="pb-14 pt-12 sm:pb-20 sm:pt-16 lg:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[2.1rem] sm:text-[3rem] lg:text-[3.3rem]">
              Neem contact met ons op.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground sm:text-lg">
              Heeft u een vraag, wilt u meer informatie of wilt u iemand onder
              onze aandacht brengen? Neem gerust contact met ons op.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="sky">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {REGIONS.map((region, i) => (
              <Reveal
                key={region.label}
                delay={i * 100}
                className={`rounded-sm border border-primary/10 bg-background p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9`}
              >
                <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                  {region.label}
                </h2>
                <p className="mt-5">
                  <a
                    href={`mailto:${region.email}`}
                    className="link-underline break-all font-display text-lg font-semibold text-primary"
                  >
                    {region.email}
                  </a>
                </p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Rekeningnummer</dt>
                    <dd className="font-display text-base font-medium">
                      {region.iban}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Ten name van</dt>
                    <dd>{region.holder}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">RSIN</dt>
                    <dd>{region.rsin}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <div aria-hidden="true" className="h-12 bg-background sm:h-16 lg:h-20" />

      <Section tone="sand">
        <LineField stroke="var(--clay)" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <Eyebrow className="text-clay">Steun ons</Eyebrow>
              <h2 className="mt-5 text-[1.8rem] sm:text-4xl lg:text-[2.6rem]">
                Steun ons
              </h2>
              <p className="mt-6 text-muted-foreground sm:text-lg">
                Alle activiteiten van Caritas BOAZ worden gefinancierd uit giften
                en legaten. Met financiële steun kunnen wij ons blijven inzetten
                voor mensen en initiatieven die dat nodig hebben.
              </p>
              <p className="mt-5 text-muted-foreground">
                Giften zijn fiscaal aftrekbaar vanwege de ANBI-status.
              </p>
            </Reveal>
            <Reveal delay={120} className="space-y-4 self-center">
              {REGIONS.map((region) => (
                <div
                  key={region.label}
                  className="rounded-sm border border-clay/25 bg-background/70 p-6"
                >
                  <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                    {region.label}
                  </p>
                  <p className="mt-3 font-display text-lg font-semibold">
                    {region.iban}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {region.holder}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>
      <HelpCtaSection
        title="Wilt u financiële ondersteuning aanvragen?"
        color="clay"
      />

    </>
  );
}
