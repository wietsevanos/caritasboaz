import { createFileRoute } from "@tanstack/react-router";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { HelpCtaSection } from "@/components/site/HelpCtaSection";
import communityCircleAsset from "@/assets/community-circle.png.asset.json";

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
      <Section tone="white" className="pb-14 pt-12 sm:pb-20 sm:pt-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.78fr)] lg:gap-16">
            <Reveal>
              <Eyebrow>Geschiedenis</Eyebrow>
              <h1 className="mt-6 text-[2.1rem] sm:text-[3rem] lg:text-[3.3rem]">
                Een geschiedenis van omzien naar elkaar.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <img src={communityCircleAsset.url} alt="Mensen verbonden met hun omgeving" className="aspect-[4/3] w-full rounded-sm object-cover" width="1024" height="1024" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="sky">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
            <div><Eyebrow>Achtergrond</Eyebrow><h2 className="mt-4 text-3xl sm:text-4xl">Omzien naar elkaar</h2></div>
            <p className="max-w-2xl text-muted-foreground sm:text-lg">Caritas BOAZ komt voort uit een lange traditie van naastenliefde binnen de parochies van Bloemendaal, Overveen, Aerdenhout en Zandvoort.</p>
          </Reveal>
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
            <Reveal className="mt-12 border-l-[3px] border-clay bg-muted p-8 sm:p-10">
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

      <Section tone="sage">
        <Container>
          <Reveal>
            <Eyebrow>Archief</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">Historisch materiaal</h2>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <Reveal className="rounded-sm border border-primary/10 bg-background/75 p-7 sm:p-8">
              <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">Beeldmateriaal</p>
              <h3 className="mt-4 text-xl">Foto’s uit het archief</h3>
              <p className="mt-3 text-muted-foreground">Ruimte voor historisch beeldmateriaal dat later zorgvuldig wordt toegevoegd.</p>
            </Reveal>
            <Reveal delay={90} className="rounded-sm border border-primary/10 bg-background/75 p-7 sm:p-8">
              <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-soft">Documenten</p>
              <h3 className="mt-4 text-xl">Het boekje van Henriëtte</h3>
              <p className="mt-3 text-muted-foreground">De historische informatie wordt later aangevuld op basis van het boekje.</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <HelpCtaSection />

    </>
  );
}
