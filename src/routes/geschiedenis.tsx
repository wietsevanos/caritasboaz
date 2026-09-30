import { createFileRoute } from "@tanstack/react-router";
import {
  Container,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { HelpCtaSection } from "@/components/site/HelpCtaSection";
import communityCircleAsset from "@/assets/community-circle.png.asset.json";
import charitasBookletAsset from "@/assets/charitas-boekje-1953.png.asset.json";

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
            <div className="max-w-2xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Caritas BOAZ komt voort uit een lange traditie van naastenliefde binnen de parochies van Bloemendaal, Overveen, Aerdenhout en Zandvoort.
              </p>
              <div className="mt-8 space-y-6 border-l-[3px] border-clay/40 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  De PCI Caritas BOAZ is <strong className="font-semibold text-foreground">opgericht in 1855</strong> als het ‘Parochiaal Armbestuur te Overveen’. De zorg voor armen door christelijke kerken, waarvan de oudste vorm terug te vinden is in de Handelingen der Apostelen, kent een lange geschiedenis. De oudste vorm van christelijke armenzorg treft men in de Handelingen der Apostelen aan.
                </p>
                <p>
                  Tot de 16e eeuw was de armenzorg uitsluitend in handen van de katholieke kerk. De Hervorming en de Tachtigjarige Oorlog brachten grote veranderingen met zich mee toen katholieke instellingen werden opgeheven. Daarmee kwam de armenzorg onder protestante diaconieën te vallen. De katholieke armen kregen geen hulp van de protestanten, hierin moest de overheid voorzien. Dit was de eerste vorm van armenzorg van overheidswege. In de gouden eeuw kwamen rijke stichtingen op, waaronder katholieke stichtingen de zorg voor wezen, weduwen en ouderen op zich namen, bijvoorbeeld door te voorzien in woonruimte. Hier vinden de hofjes hun oorsprong.
                </p>
                <p>
                  Dankzij de vrijgevigheid van onze voorouders is het armbestuur mogelijk gemaakt en dat heeft geleid tot de PCI in zijn huidige vorm.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Vandaag</Eyebrow>
            <p className="mt-5 font-display text-xl leading-relaxed sm:text-2xl">
              In die traditie helpen we nog steeds mensen in Bloemendaal, Overveen, Aerdenhout en Zandvoort.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="sage">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
            <Reveal className="mx-auto w-full max-w-[30rem] lg:mx-0">
              <div className="rounded-sm border border-primary/10 bg-background p-3 shadow-sm sm:p-4">
                <img
                  src={charitasBookletAsset.url}
                  alt="Omslag van het boekje 100 jaar Charitas uit 1953"
                  className="aspect-[768/1024] w-full rounded-sm object-cover"
                  width="768"
                  height="1024"
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Eyebrow>Uit het archief</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl">Een stukje geschiedenis</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Dit boekje uit 1953 vertelt over 100 jaar Charitas in Overveen en laat zien hoe de traditie van omzien naar mensen in nood door de jaren heen is ontstaan.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <HelpCtaSection color="clay" />

    </>
  );
}
