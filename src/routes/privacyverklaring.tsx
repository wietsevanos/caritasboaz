import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow, Reveal, Section } from "@/components/site/primitives";

const TITLE = "Privacyverklaring — Caritas BOAZ";
const DESCRIPTION =
  "Hoe Caritas BOAZ omgaat met persoonlijke gegevens van mensen die contact opnemen of een hulpvraag indienen.";

export const Route = createFileRoute("/privacyverklaring")({
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
  component: Privacy,
});

const BLOCKS = [
  {
    title: "Welke gegevens wij ontvangen",
    text: "Wanneer u een hulpvraag indient of contact met ons opneemt, ontvangen wij de gegevens die u zelf aan ons verstrekt, zoals uw naam, e-mailadres, telefoonnummer, woonplaats en de beschrijving van uw situatie.",
  },
  {
    title: "Waarvoor wij deze gegevens gebruiken",
    text: "Wij gebruiken uw gegevens uitsluitend om uw vraag te beoordelen, contact met u op te nemen en te bekijken of en hoe Caritas BOAZ mogelijk kan helpen.",
  },
  {
    title: "Vertrouwelijkheid",
    text: "Uw informatie wordt zorgvuldig en vertrouwelijk behandeld. Gegevens worden alleen gedeeld met de bestuursleden of contactpersonen die bij de behandeling van uw vraag betrokken zijn.",
  },
  {
    title: "Bewaartermijn",
    text: "Gegevens worden niet langer bewaard dan nodig is voor de behandeling van uw vraag en de administratieve verplichtingen die daarbij horen.",
  },
  {
    title: "Uw rechten",
    text: "U kunt ons vragen welke gegevens wij van u hebben, deze laten aanpassen of laten verwijderen. Neem hiervoor contact op via de contactgegevens op deze website.",
  },
  {
    title: "Voorbeelden op deze website",
    text: "Situaties en projecten worden op deze website altijd anoniem weergegeven. Er worden geen persoonlijke gegevens van hulpvragers gepubliceerd.",
  },
];

function Privacy() {
  return (
    <>
      <Section tone="white" className="pb-10 pt-12 sm:pb-14 sm:pt-16">
        <Container size="narrow">
          <Reveal>
            <Eyebrow>Privacy</Eyebrow>
            <h1 className="mt-6 text-[2rem] sm:text-[2.8rem]">
              Privacyverklaring
            </h1>
            <p className="mt-6 text-muted-foreground sm:text-lg">
              Caritas BOAZ gaat zorgvuldig om met persoonlijke gegevens. Deze
              verklaring beschrijft in het kort hoe wij dat doen.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" className="pt-0 sm:pt-0 lg:pt-0">
        <Container size="narrow">
          <div className="space-y-px">
            {BLOCKS.map((block, i) => (
              <Reveal
                key={block.title}
                delay={i * 60}
                className="border-t border-border py-7 last:border-b"
              >
                <h2 className="text-xl sm:text-2xl">{block.title}</h2>
                <p className="mt-3 text-muted-foreground">{block.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 rounded-sm bg-sky p-7">
            <h2 className="text-xl">Vragen over privacy</h2>
            <p className="mt-3 text-muted-foreground">
               Heeft u een vraag over uw gegevens? Neem contact op via de
               e-mailadressen op de contactpagina.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
