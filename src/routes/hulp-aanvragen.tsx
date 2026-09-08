import { createFileRoute } from "@tanstack/react-router";
import { useId, useRef, useState } from "react";
import { z } from "zod";
import {
  Button,
  Container,
  Eyebrow,
  Reveal,
  Section,
  Statement,
} from "@/components/site/primitives";
import { AcuteNoodBlock } from "@/components/site/AcuteNoodBlock";

const TITLE = "Hulp aanvragen — Caritas BOAZ";
const DESCRIPTION =
  "Vertel ons wat er speelt. Caritas BOAZ bekijkt zorgvuldig of en hoe ondersteuning mogelijk is bij tijdelijke financiële of persoonlijke nood.";

export const Route = createFileRoute("/hulp-aanvragen")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: HulpAanvragen,
});

const SUBJECTS = [
  "Financiële ondersteuning",
  "Persoonlijke nood",
  "Ondersteuning voor een project",
  "Iemand anders onder de aandacht brengen",
  "Anders",
] as const;

const schema = z.object({
  naam: z
    .string()
    .trim()
    .min(2, { message: "Vul uw naam in." })
    .max(100, { message: "Naam mag maximaal 100 tekens bevatten." }),
  email: z
    .string()
    .trim()
    .email({ message: "Vul een geldig e-mailadres in." })
    .max(255, { message: "E-mailadres is te lang." }),
  telefoon: z
    .string()
    .trim()
    .min(6, { message: "Vul een geldig telefoonnummer in." })
    .max(30, { message: "Telefoonnummer is te lang." })
    .regex(/^[0-9+()\s-]+$/, {
      message: "Gebruik alleen cijfers, spaties en + ( ) -",
    }),
  woonplaats: z
    .string()
    .trim()
    .min(2, { message: "Vul uw woonplaats in." })
    .max(80, { message: "Woonplaats is te lang." }),
  onderwerp: z.string().min(1, { message: "Kies waar uw hulpvraag over gaat." }),
  situatie: z
    .string()
    .trim()
    .min(20, { message: "Vertel kort wat er speelt (minimaal 20 tekens)." })
    .max(2000, { message: "Maximaal 2000 tekens." }),
  instanties: z
    .string()
    .min(1, { message: "Geef aan of u al contact heeft gehad." }),
  toevoeging: z.string().trim().max(1000, { message: "Maximaal 1000 tekens." }),
});

type FieldName = keyof z.infer<typeof schema>;
type Errors = Partial<Record<FieldName, string>>;

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-base transition-colors placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[invalid=true]:border-destructive sm:px-5 sm:py-4";

function HulpAanvragen() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const formId = useId();
  const successRef = useRef<HTMLDivElement | null>(null);

  const fid = (name: string) => `${formId}-${name}`;
  const eid = (name: string) => `${formId}-${name}-error`;

  const describedBy = (name: FieldName, extra?: string) =>
    [errors[name] ? eid(name) : null, extra].filter(Boolean).join(" ") ||
    undefined;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const result = schema.safeParse({
      naam: String(data["naam"] ?? ""),
      email: String(data["email"] ?? ""),
      telefoon: String(data["telefoon"] ?? ""),
      woonplaats: String(data["woonplaats"] ?? ""),
      onderwerp: String(data["onderwerp"] ?? ""),
      situatie: String(data["situatie"] ?? ""),
      instanties: String(data["instanties"] ?? ""),
      toevoeging: String(data["toevoeging"] ?? ""),
    });

    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const firstKey = Object.keys(next)[0];
      if (firstKey) {
        const el = form.querySelector<HTMLElement>(`[name="${firstKey}"]`);
        el?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitted(true);
    form.reset();
    requestAnimationFrame(() => successRef.current?.focus());
  }

  return (
    <>
      <Section tone="white" className="pb-10 pt-12 sm:pb-14 sm:pt-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
            <Reveal>
              <Eyebrow>Hulp aanvragen</Eyebrow>
              <h1 className="mt-6 text-[2.1rem] sm:text-[3rem]">
                Heeft u hulp nodig?
              </h1>
              <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
                Soms komt iemand tijdelijk in een situatie terecht waarin extra
                hulp nodig is. Vertel ons gerust wat er speelt. We bekijken
                zorgvuldig of en hoe Caritas BOAZ mogelijk kan helpen.
              </p>
            </Reveal>
            <Reveal delay={120} className="self-center rounded-sm bg-sky p-7">
              <Statement className="text-[1.4rem] sm:text-[1.75rem] lg:text-[1.9rem]">
                Samen kijken we wat mogelijk is.
              </Statement>
              <p className="mt-4 text-sm text-muted-foreground">
                Uw informatie wordt zorgvuldig en vertrouwelijk behandeld.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pt-0 sm:pt-0 lg:pt-0">
        <Container size="default" className="px-5 sm:px-8">
          {submitted ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="mx-auto max-w-3xl rounded-sm border border-sage-strong/40 bg-sage p-8 sm:p-10"
            >
              <h2 className="text-2xl sm:text-3xl">Bedankt voor uw bericht.</h2>
              <p className="mt-4 text-muted-foreground">
                We hebben uw aanvraag ontvangen en nemen deze zorgvuldig in
                behandeling.
              </p>
              <Button
                variant="outline"
                className="mt-8"
                onClick={() => setSubmitted(false)}
              >
                Nog een aanvraag doen
              </Button>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 text-center lg:mb-10">
                <h2 className="text-2xl font-medium sm:text-3xl">Uw aanvraag</h2>
                <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                  Vul het formulier zo volledig mogelijk in. Hoe meer we weten,
                  hoe gerichter we kunnen meekijken.
                </p>
              </div>

              <form
                noValidate
                onSubmit={handleSubmit}
                className="rounded-sm border border-border bg-background p-6 sm:p-10 lg:p-12"
              >
                <fieldset>
                  <legend className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-soft">
                    <span
                      className="h-px w-6 bg-primary-soft/60"
                      aria-hidden="true"
                    />
                    Uw gegevens
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    <div>
                      <label htmlFor={fid("naam")} className="font-medium">
                        Naam
                      </label>
                      <input
                        id={fid("naam")}
                        name="naam"
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={100}
                        aria-invalid={Boolean(errors.naam)}
                        aria-describedby={describedBy("naam")}
                        className={fieldClass}
                      />
                      <FieldError id={eid("naam")} message={errors.naam} />
                    </div>
                    <div>
                      <label htmlFor={fid("email")} className="font-medium">
                        E-mailadres
                      </label>
                      <input
                        id={fid("email")}
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        maxLength={255}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={describedBy("email")}
                        className={fieldClass}
                      />
                      <FieldError id={eid("email")} message={errors.email} />
                    </div>
                    <div>
                      <label htmlFor={fid("telefoon")} className="font-medium">
                        Telefoonnummer
                      </label>
                      <input
                        id={fid("telefoon")}
                        name="telefoon"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        maxLength={30}
                        aria-invalid={Boolean(errors.telefoon)}
                        aria-describedby={describedBy("telefoon")}
                        className={fieldClass}
                      />
                      <FieldError id={eid("telefoon")} message={errors.telefoon} />
                    </div>
                    <div>
                      <label htmlFor={fid("woonplaats")} className="font-medium">
                        Woonplaats
                      </label>
                      <input
                        id={fid("woonplaats")}
                        name="woonplaats"
                        type="text"
                        autoComplete="address-level2"
                        required
                        maxLength={80}
                        aria-invalid={Boolean(errors.woonplaats)}
                        aria-describedby={describedBy("woonplaats")}
                        className={fieldClass}
                      />
                      <FieldError id={eid("woonplaats")} message={errors.woonplaats} />
                    </div>
                  </div>
                </fieldset>

                <div className="my-8 border-t border-border lg:my-10" aria-hidden="true" />

                <fieldset>
                  <legend className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-soft">
                    <span
                      className="h-px w-6 bg-primary-soft/60"
                      aria-hidden="true"
                    />
                    Uw hulpvraag
                  </legend>
                  <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                    <div>
                      <label htmlFor={fid("onderwerp")} className="font-medium">
                        Waar gaat het over?
                      </label>
                      <select
                        id={fid("onderwerp")}
                        name="onderwerp"
                        required
                        defaultValue=""
                        aria-invalid={Boolean(errors.onderwerp)}
                        aria-describedby={describedBy("onderwerp")}
                        className={fieldClass}
                      >
                        <option value="" disabled>
                          Maak een keuze
                        </option>
                        {SUBJECTS.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                      <FieldError id={eid("onderwerp")} message={errors.onderwerp} />
                    </div>
                    <div>
                      <label htmlFor={fid("situatie")} className="font-medium">
                        Kunt u kort vertellen wat er speelt?
                      </label>
                      <textarea
                        id={fid("situatie")}
                        name="situatie"
                        rows={6}
                        required
                        maxLength={2000}
                        aria-invalid={Boolean(errors.situatie)}
                        aria-describedby={describedBy("situatie")}
                        className={fieldClass}
                      />
                      <FieldError id={eid("situatie")} message={errors.situatie} />
                    </div>
                  </div>
                </fieldset>

                <div className="my-8 border-t border-border lg:my-10" aria-hidden="true" />

                <fieldset>
                  <legend className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-soft">
                    <span
                      className="h-px w-6 bg-primary-soft/60"
                      aria-hidden="true"
                    />
                    Meer informatie
                  </legend>
                  <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                    <div>
                      <p className="font-medium">
                        Heeft u al contact gehad met andere instanties?
                      </p>
                      <div
                        className="mt-3 flex flex-wrap gap-3"
                        aria-describedby={describedBy("instanties")}
                      >
                        {["Ja", "Nee", "Onbekend"].map((option) => (
                          <label
                            key={option}
                            className="flex flex-1 cursor-pointer items-center gap-3 rounded-sm border border-input px-4 py-3 transition-colors hover:border-border-strong hover:bg-secondary has-[:checked]:border-primary has-[:checked]:bg-secondary sm:flex-none sm:min-w-[8rem]"
                          >
                            <input
                              type="radio"
                              name="instanties"
                              value={option}
                              className="h-4 w-4 accent-[var(--primary)]"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                      <FieldError id={eid("instanties")} message={errors.instanties} />
                    </div>
                    <div>
                      <label htmlFor={fid("toevoeging")} className="font-medium">
                        Wilt u nog iets toevoegen?{" "}
                        <span className="font-normal text-muted-foreground">
                          (optioneel)
                        </span>
                      </label>
                      <textarea
                        id={fid("toevoeging")}
                        name="toevoeging"
                        rows={4}
                        maxLength={1000}
                        aria-invalid={Boolean(errors.toevoeging)}
                        aria-describedby={describedBy("toevoeging")}
                        className={fieldClass}
                      />
                      <FieldError id={eid("toevoeging")} message={errors.toevoeging} />
                    </div>
                  </div>
                </fieldset>

                <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-sm text-muted-foreground">
                    Uw informatie wordt zorgvuldig en vertrouwelijk behandeld.
                  </p>
                  <Button type="submit" className="w-full sm:w-auto">
                    Verstuur aanvraag
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Container>
      </Section>

      <AcuteNoodBlock />
    </>
  );
}

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive">
      {message}
    </p>
  );
}
