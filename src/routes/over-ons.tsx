import { createFileRoute } from "@tanstack/react-router";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/site/primitives";
import { HelpCtaSection } from "@/components/site/HelpCtaSection";
import peopleTogetherAsset from "@/assets/people-together.png.asset.json";

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

function OverOns() {
  return (
    <>
      <Section tone="white" className="pb-14 pt-12 sm:pb-20 sm:pt-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Over ons</Eyebrow>
                <h1 className="mt-6 max-w-3xl text-[2.1rem] sm:text-[3rem] lg:text-[3.4rem]">
                  Over Caritas BOAZ
                </h1>
                <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
                  Caritas BOAZ is een charitatieve instelling van de rooms-katholieke
                  geloofsgemeenschap die hulp biedt aan mensen in nood. Wij bieden
                  financiële ondersteuning aan personen en welzijnsorganisaties.
                </p>
              </Reveal>
              <Reveal delay={100} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink to="/over-ons" hash="bestuur" variant="outline">Bestuur</ButtonLink>
                <ButtonLink to="/over-ons" hash="commissies" variant="outline">Commissies</ButtonLink>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <img src={peopleTogetherAsset.url} alt="Mensen die samen betrokken zijn" className="aspect-[4/3] w-full rounded-sm object-cover" width="1024" height="1024" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="sky" id="bestuur" className="scroll-mt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="flex min-w-0 flex-col justify-between lg:col-span-4">
              <div>
                <Eyebrow>Organisatie</Eyebrow>
                <h2 className="mt-4 text-3xl sm:text-4xl">Bestuur</h2>
                <p className="mt-5 max-w-sm text-muted-foreground sm:text-lg">
                  Het bestuur bestaat uit de volgende leden:
                </p>
              </div>

              <div className="mt-8 rounded-sm border border-primary/10 bg-background/70 p-5 sm:p-6 lg:mt-12">
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">
                  Contact
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Het bestuur is te bereiken op
                </p>
                <a
                  href="mailto:info@caritasboaz.nl"
                  className="link-underline mt-1 inline-block break-words font-display text-[0.95rem] font-semibold text-primary sm:text-base"
                >
                  info@caritasboaz.nl
                </a>
              </div>
            </Reveal>
            <Reveal delay={100} className="min-w-0 lg:col-span-8">
              <dl className="grid gap-4 sm:grid-cols-2">
                {[["Voorzitter", "Henriëtte Maasen"], ["Secretaris", "Elsbeth Blomjous"], ["Penningmeester", "Lex Bouchier"], ["Lid", "Maria Heijne"], ["Lid", "Oda Smets"]].map(([role, name]) => (
                  <div key={name} className="group min-h-32 rounded-sm border border-primary/10 bg-background p-6 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30 sm:p-7">
                    <dt className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary-soft">{role}</dt>
                    <dd className="mt-3 font-display text-xl font-semibold leading-snug">{name}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white" id="commissies" className="scroll-mt-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Commissies</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">Dichtbij in de regio</h2>
            <p className="mt-5 text-muted-foreground">Caritas werkt met twee commissies voor het behandelen van aanvragen.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal as="section" className="rounded-sm border border-border bg-sage p-7 sm:p-9">
              <div id="commissie-bloemendaal-overveen" className="scroll-mt-28">
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">Commissie</p>
                <h3 className="mt-4 text-2xl">Bloemendaal/Overveen</h3>
                <p className="mt-6"><a href="mailto:bloemendaal.overveen@caritasboaz.nl" className="link-underline break-words text-[0.95rem] font-medium text-primary sm:text-base">bloemendaal.overveen@caritasboaz.nl</a></p>
              </div>
            </Reveal>
            <Reveal as="section" delay={100} className="rounded-sm border border-border bg-sand p-7 sm:p-9">
              <div id="commissie-aerdenhout-zandvoort" className="scroll-mt-28">
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">Commissie</p>
                <h3 className="mt-4 text-2xl">Aerdenhout/Zandvoort</h3>
                <p className="mt-6"><a href="mailto:aerdenhout.zandvoort@caritasboaz.nl" className="link-underline break-words text-[0.95rem] font-medium text-primary sm:text-base">aerdenhout.zandvoort@caritasboaz.nl</a></p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="sage" className="py-14 sm:py-18">
        <Container>
          <Reveal className="grid gap-7 border-l-[3px] border-clay pl-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:pl-8">
            <div><Eyebrow className="text-clay">Aanvragen</Eyebrow><h2 className="mt-4 text-2xl sm:text-3xl">Financiële ondersteuning aanvragen</h2><p className="mt-4 max-w-2xl text-muted-foreground">Hebt u of uw organisatie behoefte aan financiële ondersteuning? Vul het aanvraagformulier in.</p></div>
            <ButtonLink to="/hulp-aanvragen" className="w-full sm:w-auto">Hulp aanvragen</ButtonLink>
          </Reveal>
        </Container>
      </Section>
      <HelpCtaSection title="Kunnen wij iets voor u betekenen?" />
    </>
  );
}
