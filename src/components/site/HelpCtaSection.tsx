import { ButtonLink, Container, Eyebrow, Reveal, Section } from "./primitives";
import { DriftingShapes } from "./visuals";

export function HelpCtaSection({
  title = "Heeft u ondersteuning nodig?",
  text = "We helpen u stap voor stap met het indienen van een aanvraag.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Section tone="primary" className="py-14 sm:py-16 lg:py-20">
      <DriftingShapes />
      <Container className="relative">
        <Reveal className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
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
      </Container>
    </Section>
  );
}