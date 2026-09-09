import { ACUTE_CONTACT } from "@/lib/site";
import { Container, Eyebrow, Section } from "./primitives";
import { cn } from "@/lib/utils";

export function AcuteNoodBlock({
  bare = false,
  className,
}: {
  bare?: boolean;
  className?: string;
}) {
  const block = (
    <div
      className={cn(
        "grid gap-8 rounded-sm border border-clay/30 bg-clay-soft p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:p-9",
        className,
      )}
    >
      <div>
        <Eyebrow className="text-clay">Acute nood</Eyebrow>
        <h2 className="mt-3 text-2xl sm:text-[1.75rem]">Acute nood</h2>
        <p className="mt-4 text-muted-foreground">
          Bij acute persoonlijke of sociale nood kan contact worden opgenomen met{" "}
          {ACUTE_CONTACT.name}.
        </p>
      </div>
      <div className="space-y-4 border-t border-clay/25 pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
        <p className="font-display font-semibold">{ACUTE_CONTACT.name}</p>
        <p>
          <a
            href={ACUTE_CONTACT.phoneHref}
            className="link-underline font-display text-lg font-semibold text-primary"
          >
            {ACUTE_CONTACT.phone}
          </a>
        </p>
        <p>
          <a
            href={`mailto:${ACUTE_CONTACT.email}`}
            className="link-underline break-all text-primary"
          >
            {ACUTE_CONTACT.email}
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          Bij levensbedreigende situaties of noodsituaties moet altijd contact
          worden opgenomen met de juiste alarmdiensten, bijvoorbeeld 112.
        </p>
      </div>
    </div>
  );

  if (bare) return block;

  return (
    <Section tone="sand" className="py-12 sm:py-16">
      <Container>{block}</Container>
    </Section>
  );
}
