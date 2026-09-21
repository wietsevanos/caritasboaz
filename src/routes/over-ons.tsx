import { createFileRoute } from "@tanstack/react-router";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/site/primitives";

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
      <Section tone="white" className="pb-12 pt-12 sm:pb-16 sm:pt-16">
        <Container>
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
          <Reveal delay={100} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink to="/over-ons" hash="bestuur" variant="outline">Bestuur</ButtonLink>
            <ButtonLink to="/over-ons" hash="commissie-bloemendaal-overveen" variant="outline">Commissie Bloemendaal/Overveen</ButtonLink>
            <ButtonLink to="/over-ons" hash="commissie-aerdenhout-zandvoort" variant="outline">Aerdenhout/Zandvoort</ButtonLink>
          </Reveal>
        </Container>
      </Section>

      <Section tone="sky">
        <Container size="narrow">
          <div className="space-y-12">
            <Reveal as="section" className="scroll-mt-28" >
              <div id="bestuur" className="scroll-mt-28">
                <Eyebrow>Organisatie</Eyebrow>
                <h2 className="mt-4 text-3xl">Bestuur</h2>
                <p className="mt-5 text-muted-foreground">Bestuur bestaat uit de volgende leden:</p>
                <dl className="mt-6 grid gap-3 border-t border-primary/15 pt-6 sm:grid-cols-2">
                  <div><dt className="text-sm text-muted-foreground">Voorzitter</dt><dd className="font-medium">Henriëtte Maasen</dd></div>
                  <div><dt className="text-sm text-muted-foreground">Secretaris</dt><dd className="font-medium">Elsbeth Blomjous</dd></div>
                  <div><dt className="text-sm text-muted-foreground">Penningmeester</dt><dd className="font-medium">Lex Bouchier</dd></div>
                  <div><dt className="text-sm text-muted-foreground">Lid</dt><dd className="font-medium">Maria Heijne</dd></div>
                  <div><dt className="text-sm text-muted-foreground">Lid</dt><dd className="font-medium">Oda Smets</dd></div>
                </dl>
                <p className="mt-6">Het bestuur is te bereiken op <a href="mailto:info@caritasboaz.nl" className="link-underline text-primary">info@caritasboaz.nl</a>.</p>
              </div>
            </Reveal>
            <div className="border-t border-primary/15" />
            <Reveal as="section" className="scroll-mt-28">
              <div id="commissie-bloemendaal-overveen" className="scroll-mt-28">
                <Eyebrow>Commissies</Eyebrow>
                <h2 className="mt-4 text-3xl">Bloemendaal/Overveen</h2>
                <p className="mt-5 text-muted-foreground">Caritas werkt met twee commissies voor het behandelen van aanvragen.</p>
                <p className="mt-5"><a href="mailto:bloemendaal.overveen@caritasboaz.nl" className="link-underline break-all font-medium text-primary">bloemendaal.overveen@caritasboaz.nl</a></p>
              </div>
            </Reveal>
            <div className="border-t border-primary/15" />
            <Reveal as="section" className="scroll-mt-28">
              <div id="commissie-aerdenhout-zandvoort" className="scroll-mt-28">
                <Eyebrow>Commissies</Eyebrow>
                <h2 className="mt-4 text-3xl">Aerdenhout/Zandvoort</h2>
                <p className="mt-5"><a href="mailto:aerdenhout.zandvoort@caritasboaz.nl" className="link-underline break-all font-medium text-primary">aerdenhout.zandvoort@caritasboaz.nl</a></p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="narrow">
          <Reveal className="border-l-[3px] border-clay pl-6 sm:pl-8">
            <h2 className="text-2xl sm:text-3xl">Financiële ondersteuning aanvragen</h2>
            <p className="mt-4 text-muted-foreground">Hebt u of uw organisatie behoefte aan financiële ondersteuning? Vul het aanvraagformulier in.</p>
            <ButtonLink to="/hulp-aanvragen" className="mt-7">Hulp aanvragen</ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
