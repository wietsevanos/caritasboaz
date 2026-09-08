import { ButtonLink, Container, Eyebrow, Reveal, Section } from "./primitives";
import { DriftingShapes } from "./visuals";

export function HelpCta() {
  return (
    <Section tone="white" className="py-0 sm:py-0 lg:py-0">
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal className="relative overflow-hidden rounded-sm bg-clay px-6 py-14 text-primary-foreground sm:px-12 sm:py-16 lg:px-16">
          <DriftingShapes />
          <div className="relative max-w-2xl">
            <Eyebrow className="text-primary-foreground/80">
              Hulp nodig?
            </Eyebrow>
            <h2 className="mt-4 text-[2rem] sm:text-[2.75rem]">Hulp nodig?</h2>
            <p className="mt-5 text-primary-foreground/90 sm:text-lg">
              Soms kan een tijdelijke situatie grote gevolgen hebben. Vertel ons
              gerust wat er speelt. We bekijken zorgvuldig of en hoe Caritas BOAZ
              mogelijk kan helpen.
            </p>
            <div className="mt-9">
              <ButtonLink to="/hulp-aanvragen" variant="ghostLight">
                Hulp aanvragen
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
