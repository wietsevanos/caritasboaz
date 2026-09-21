import { ButtonLink, Container, Eyebrow, Reveal, Section } from "./primitives";
import { DriftingShapes } from "./visuals";
import { cn } from "@/lib/utils";

export function HelpCtaSection({
  title = "Heeft u ondersteuning nodig?",
  text = "We helpen u stap voor stap met het indienen van een aanvraag.",
  color = "blue",
}: {
  title?: string;
  text?: string;
  color?: "blue" | "clay";
}) {
  return (
    <Section tone="white" className="py-10 sm:py-14 lg:py-16">
      <Container size="wide">
        <div
          className={cn(
            "relative overflow-hidden rounded-sm px-6 py-12 text-primary-foreground sm:px-10 sm:py-14 lg:px-16 lg:py-16",
            color === "blue" ? "bg-primary" : "bg-clay",
          )}
        >
          <DriftingShapes />
          <Reveal className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
            <div className="max-w-2xl">
              <Eyebrow className="text-primary-foreground/75">Hulp nodig?</Eyebrow>
              <h2 className="mt-4 text-[1.9rem] text-primary-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80 sm:text-lg">
                {text}
              </p>
            </div>
            <ButtonLink
              to="/hulp-aanvragen"
              variant="ghostLight"
              className="w-full lg:w-auto"
            >
              Hulp aanvragen
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}