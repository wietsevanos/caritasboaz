import { createFileRoute } from "@tanstack/react-router";
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

const TITLE = "Geschiedenis van Caritas BOAZ — omzien naar elkaar";
const DESCRIPTION =
  "De geschiedenis van Caritas BOAZ in Bloemendaal, Overveen, Aerdenhout en Zandvoort: een traditie van omzien naar elkaar.";

export const Route = createFileRoute("/geschiedenis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Geschiedenis,
});

/**
 * Deze pagina is voorbereid op inhoud uit het historische boekje.
 * Vul TIMELINE en de tekstblokken aan zodra de teksten beschikbaar zijn.
 */
const TIMELINE: Array<{ period: string; title: string; text: string }> = [];

function Geschiedenis() {
  return (
    <>
      <Section tone="white" className="pb-12 pt-12 sm:pb-16 sm:pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <Reveal>
              <Eyebrow>Geschiedenis</Eyebrow>
              <h1 className="mt-6 text-[2.1rem] sm:text-[3rem] lg:text-[3.3rem]">
                Een geschiedenis van omzien naar elkaar.
              </h1>
              <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
                Caritas BOAZ komt voort uit een lange traditie van
                naastenliefde binnen de parochies van Bloemendaal, Overveen,
                Aerdenhout en Zandvoort. Op deze pagina brengen we die
                geschiedenis samen.
              </p>
            </Reveal>
            <Reveal delay={140} className="relative min-h-[220px] rounded-sm bg-sky/70">
              <LineField />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container size="narrow">
          <Reveal>
            <Statement>
              Zorg voor de ander is hier al generaties lang gewoon.
            </Statement>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Tijdlijn"
            title="Belangrijke momenten"
            intro="De historische teksten en momenten worden aangevuld met informatie uit het historische boekje over Caritas BOAZ."
          />
          {TIMELINE.length > 0 ? (
            <ol className="mt-14 space-y-px">
              {TIMELINE.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.period}
                  delay={i * 80}
                  className="group grid gap-4 border-t border-border py-8 last:border-b sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-10"
                >
                  <span className="font-display text-lg font-semibold text-primary-soft">
                    {item.period}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="text-xl sm:text-2xl">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          ) : (
            <Reveal className="mt-12 rounded-sm border border-dashed border-border-strong bg-muted p-8 sm:p-10">
              <p className="font-display text-lg font-semibold">
                De tijdlijn wordt binnenkort gevuld.
              </p>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                De historische informatie uit het boekje over Caritas BOAZ wordt
                hier toegevoegd: belangrijke momenten, jaartallen en verhalen uit
                de parochies.
              </p>
            </Reveal>
          )}
        </Container>
      </Section>

      <Section tone="sage">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            <Reveal className="rounded-sm border border-primary/15 bg-background/70 p-8">
              <Eyebrow>Afbeeldingen</Eyebrow>
              <h2 className="mt-4 text-xl sm:text-2xl">
                Beeldmateriaal uit het archief
              </h2>
              <p className="mt-3 text-muted-foreground">
                Ruimte voor historische foto's en beeldmateriaal, met korte
                toelichting per afbeelding.
              </p>
            </Reveal>
            <Reveal delay={110} className="rounded-sm border border-primary/15 bg-background/70 p-8">
              <Eyebrow>Documenten</Eyebrow>
              <h2 className="mt-4 text-xl sm:text-2xl">
                Documenten en publicaties
              </h2>
              <p className="mt-3 text-muted-foreground">
                Ruimte voor documenten uit het historische boekje en andere
                publicaties over Caritas BOAZ.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <HelpCta />
    </>
  );
}
