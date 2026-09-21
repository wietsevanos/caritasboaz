import { createFileRoute } from "@tanstack/react-router";
import { AanvraagWizard } from "@/components/site/AanvraagWizard";
import { Container, Section } from "@/components/site/primitives";

const TITLE = "Hulp aanvragen — Caritas BOAZ";
const DESCRIPTION =
  "Vraag stap voor stap financiële ondersteuning aan bij Caritas BOAZ in Bloemendaal, Overveen, Aerdenhout en Zandvoort.";

export const Route = createFileRoute("/hulp-aanvragen")({
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
  component: HulpAanvragen,
});

function HulpAanvragen() {
  return (
    <Section tone="white" className="py-12 sm:py-16 lg:py-20">
      <Container size="narrow">
        <AanvraagWizard />
      </Container>
    </Section>
  );
}
