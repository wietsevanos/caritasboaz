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
import { AcuteNoodBlock } from "@/components/site/AcuteNoodBlock";
import { LineField } from "@/components/site/visuals";
import { ACUTE_CONTACT } from "@/lib/site";

const TITLE = "Contact — Caritas BOAZ";
const DESCRIPTION =
  "Contactgegevens van Caritas BOAZ voor Bloemendaal en Overveen, Aerdenhout en Zandvoort, en het contact bij acute nood.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
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
      <Section tone="white" className="pb-12 pt-12 sm:pb-16 sm:pt-16">
        <Container>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[2.1rem] sm:text-[3rem] lg:text-[3.3rem]">
              Neem contact met ons op.
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
              Heeft u een vraag, wilt u meer informatie of wilt u iemand onder
              onze aandacht brengen? Neem gerust contact met ons op.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {REGIONS.map((region, i) => (
              <Reveal
                key={region.label}
                delay={i * 100}
                className={`rounded-sm p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${region.tone}`}
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
          <Reveal delay={160} className="mt-4">
            <AcuteNoodBlock bare />
          </Reveal>
        </Container>
      </Section>

      <Section tone="sand">
        <LineField stroke="var(--clay)" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <Eyebrow className="text-clay">Steun ons</Eyebrow>
              <Statement as="h2" className="mt-5">
                Steun ons
              </Statement>
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

      <Section tone="white">
        <Container>
          <div className="grid gap-8 rounded-sm border border-border p-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-10">
            <div>
              <SectionHeading
                eyebrow="Doe mee"
                title="Doe mee"
                intro="Wilt u zich inzetten voor Caritas BOAZ en bijdragen aan de Caritas commissie bij u in de buurt?"
              />
              <p className="mt-6 font-display text-lg font-semibold">
                Caritas BOAZ zijn we samen.
              </p>
            </div>
            <ButtonLink to="/hulp-aanvragen" className="w-full sm:w-auto">
              Neem contact op
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Bij acute nood: {ACUTE_CONTACT.name},{" "}
            <a href={ACUTE_CONTACT.phoneHref} className="link-underline text-primary">
              {ACUTE_CONTACT.phone}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
