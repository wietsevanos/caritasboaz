import { createFileRoute } from "@tanstack/react-router";
import {
  Container,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/site/primitives";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Geschiedenis</Eyebrow>
              <h1 className="mt-6 text-[2.1rem] sm:text-[3rem] lg:text-[3.3rem]">
                Een geschiedenis van omzien naar elkaar.
              </h1>
              <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
                Caritas BOAZ komt voort uit een lange traditie van
                naastenliefde binnen de parochies van Bloemendaal, Overveen,
                Aerdenhout en Zandvoort.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Tijdlijn"
            title="Belangrijke momenten"
            intro="De inhoud van de tijdlijn wordt later aangevuld met informatie uit het boekje van Henriëtte."
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
                De historische informatie en belangrijke momenten worden later
                zorgvuldig toegevoegd op basis van het boekje van Henriëtte.
              </p>
            </Reveal>
          )}
        </Container>
      </Section>

    </>
  );
}
