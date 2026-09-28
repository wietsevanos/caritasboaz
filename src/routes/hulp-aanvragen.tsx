import { ArrowLeft } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AanvraagWizard } from "@/components/site/AanvraagWizard";
import { Container } from "@/components/site/primitives";
import logoAsset from "@/assets/caritas-boaz-logo.png.asset.json";

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
    <div className="relative min-h-dvh overflow-hidden bg-muted">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/95 backdrop-blur-md">
        <Container size="wide" className="relative flex h-16 items-center justify-center sm:h-[4.75rem]">
          <Link
            to="/"
            className="absolute left-5 inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold text-foreground transition-colors hover:text-primary sm:left-8 sm:gap-3"
            aria-label="Terug naar de website"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Terug</span>
          </Link>
          <div className="flex items-center">
            <img
              src={logoAsset.url}
              alt="Caritas BOAZ"
              className="h-8 w-auto object-contain sm:h-10"
              width="1920"
              height="683"
            />
          </div>
          <span className="absolute right-8 hidden text-xs font-medium text-muted-foreground md:block">
            Aanvraag financiële ondersteuning
          </span>
        </Container>
      </header>

      <div aria-hidden="true" className="relative z-10 grid h-1 grid-cols-[1fr_5rem]">
        <span className="bg-primary" />
        <span className="bg-clay" />
      </div>

      <Container size="wide" className="relative z-10 py-7 sm:py-10 lg:py-14">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg border border-primary/10 bg-background shadow-[0_18px_55px_color-mix(in_oklab,var(--primary)_8%,transparent)]">
          <div className="border-b border-primary/10 bg-secondary/45 px-5 py-3 text-center sm:px-10">
            <p className="text-xs font-medium text-muted-foreground">Veilige aanvraagomgeving</p>
          </div>
          <div className="px-5 py-7 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <AanvraagWizard />
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-4xl text-center text-xs text-muted-foreground sm:text-sm">
          Uw gegevens blijven alleen beschikbaar zolang deze aanvraag geopend is.
        </p>
      </Container>
    </div>
  );
}
