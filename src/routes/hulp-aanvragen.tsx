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
    <div className="relative min-h-dvh overflow-hidden bg-sky/55">
      <div aria-hidden="true" className="absolute inset-x-0 top-[4.5rem] h-40 border-b border-primary/5 bg-sand/45" />
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/95 backdrop-blur-md">
        <Container size="wide" className="flex h-16 items-center justify-between gap-4 sm:h-[4.75rem]">
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

      <div aria-hidden="true" className="relative z-10 grid h-1 grid-cols-4">
        <span className="bg-clay" />
        <span className="bg-primary" />
        <span className="bg-sage-strong" />
        <span className="bg-sand-strong" />
      </div>

      <Container size="wide" className="relative z-10 py-7 sm:py-10 lg:py-14">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-primary/10 bg-background shadow-[0_24px_70px_color-mix(in_oklab,var(--primary)_10%,transparent)]">
          <div aria-hidden="true" className="grid h-1.5 grid-cols-[1.35fr_1fr_0.75fr]">
            <span className="bg-clay" />
            <span className="bg-primary" />
            <span className="bg-sage-strong" />
          </div>
          <div className="px-5 py-7 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <AanvraagWizard />
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-5xl text-center text-xs text-muted-foreground sm:text-sm">
          Uw gegevens blijven alleen beschikbaar zolang deze aanvraag geopend is.
        </p>
      </Container>
    </div>
  );
}
