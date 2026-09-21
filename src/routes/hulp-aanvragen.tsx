import { ArrowLeft } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AanvraagWizard } from "@/components/site/AanvraagWizard";
import { Container } from "@/components/site/primitives";
import logoAsset from "@/assets/logo.png.asset.json";

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
    <div className="min-h-dvh bg-sky/45">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur-md">
        <Container size="wide" className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold text-foreground transition-colors hover:text-primary sm:gap-3"
            aria-label="Terug naar de website"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Terug</span>
          </Link>
          <div className="flex items-center gap-2.5 font-display text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:text-sm sm:tracking-[0.16em]">
            <img
              src={logoAsset.url}
              alt=""
              className="h-8 w-8 rounded-sm object-contain sm:h-9 sm:w-9"
              width="36"
              height="36"
              aria-hidden="true"
            />
            <span>Caritas BOAZ</span>
          </div>
        </Container>
      </header>

      <div aria-hidden="true" className="h-1 bg-clay" />

      <Container size="wide" className="py-7 sm:py-10 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-sm border border-primary/10 bg-background px-5 py-7 shadow-[0_18px_50px_color-mix(in_oklab,var(--primary)_8%,transparent)] sm:px-10 sm:py-10 lg:px-16 lg:py-14">
          <AanvraagWizard />
        </div>
        <p className="mx-auto mt-5 max-w-4xl text-center text-xs text-muted-foreground sm:text-sm">
          Uw gegevens blijven alleen beschikbaar zolang deze aanvraag geopend is.
        </p>
      </Container>
    </div>
  );
}
