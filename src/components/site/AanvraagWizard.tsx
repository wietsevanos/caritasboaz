import { useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button, ButtonLink } from "@/components/site/primitives";
import {
  ChoiceCard,
  FieldError,
  SavedHint,
  StepProgress,
  TextAreaField,
  TextField,
} from "@/components/site/wizard-ui";
import {
  HULP_TYPES,
  LEGE_AANVRAAG,
  PLAATS_ROUTING,
  STAPPEN,
  UPLOAD,
  commissieVoorPlaats,
  COMMISSIES,
  formatEuro,
  gevraagdeBijdrage,
  maakSamenvatting,
  parseBedrag,
  stapIsCompleet,
  valideerStap,
  type AanvraagData,
  type Fouten,
  type StapId,
} from "@/lib/aanvraag";
import { verzendAanvraag } from "@/lib/aanvraag.functions";
import { cn } from "@/lib/utils";

type Fase = "intro" | "stappen" | "verzonden";
type Verzendstatus = "idle" | "bezig" | "mislukt" | "niet-ingesteld";

export function AanvraagWizard() {
  const [fase, setFase] = useState<Fase>("intro");
  const [stapIndex, setStapIndex] = useState(0);
  const [data, setData] = useState<AanvraagData>(LEGE_AANVRAAG);
  const [fouten, setFouten] = useState<Fouten>({});
  const [bestandsFout, setBestandsFout] = useState<string | null>(null);
  const [status, setStatus] = useState<Verzendstatus>("idle");
  const [bevestigdeCommissie, setBevestigdeCommissie] = useState<string>("");
  const [opgeslagen, setOpgeslagen] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const verzend = useServerFn(verzendAanvraag);

  const stap = STAPPEN[stapIndex]!;
  const labels = useMemo(() => STAPPEN.map((item) => item.kort), []);

  function set<K extends keyof AanvraagData>(key: K, value: AanvraagData[K]) {
    setData((huidig) => ({ ...huidig, [key]: value }));
    setFouten((huidig) => ({ ...huidig, [key]: undefined }));
    setOpgeslagen(false);
  }

  function focusEersteFout(volgende: Fouten) {
    const eerste = Object.keys(volgende)[0];
    if (!eerste) return;
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[name="${eerste}"]`);
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        el.focus({ preventScroll: true });
      } else {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  function naarStap(index: number) {
    setStapIndex(index);
    setFouten({});
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function volgende(vanaf: number = stapIndex, huidigeData: AanvraagData = data) {
    const stapId = STAPPEN[vanaf]!.id;
    const volgendeFouten = valideerStap(stapId, huidigeData);
    if (Object.keys(volgendeFouten).length > 0) {
      setFouten(volgendeFouten);
      focusEersteFout(volgendeFouten);
      return;
    }
    setOpgeslagen(true);
    if (vanaf < STAPPEN.length - 1) naarStap(vanaf + 1);
  }

  function kiesAanvragerType(type: "persoon" | "organisatie") {
    const volgendeData = { ...data, aanvragerType: type };
    setData(volgendeData);
    setFouten({});
    volgende(0, volgendeData);
  }

  function voegBestandenToe(lijst: FileList | null) {
    if (!lijst) return;
    setBestandsFout(null);
    const nieuw = [...data.bestanden];
    for (const file of Array.from(lijst)) {
      const extensie = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!UPLOAD.types.includes(extensie)) {
        setBestandsFout("Dit bestandstype wordt niet ondersteund. Kies een PDF, JPG, PNG of Word-bestand.");
        continue;
      }
      if (file.size > UPLOAD.maxBytes) {
        setBestandsFout("Dit bestand is te groot. Kies een kleiner bestand (maximaal 8 MB).");
        continue;
      }
      if (nieuw.length >= UPLOAD.maxFiles) {
        setBestandsFout(`U kunt maximaal ${UPLOAD.maxFiles} bestanden toevoegen.`);
        break;
      }
      nieuw.push({ name: file.name, size: file.size });
    }
    setData((huidig) => ({ ...huidig, bestanden: nieuw }));
  }

  async function verstuur() {
    const laatste = valideerStap("controleren", data);
    if (Object.keys(laatste).length > 0) {
      setFouten(laatste);
      focusEersteFout(laatste);
      return;
    }
    setStatus("bezig");
    try {
      const resultaat = await verzend({ data: { aanvraag: data } });
      if (resultaat.status === "verzonden") {
        setBevestigdeCommissie(resultaat.commissie);
        setFase("verzonden");
        setStatus("idle");
        requestAnimationFrame(() =>
          topRef.current?.scrollIntoView({ behavior: "smooth" }),
        );
        return;
      }
      if (resultaat.status === "ongeldig") {
        setStatus("mislukt");
        return;
      }
      setStatus("niet-ingesteld");
    } catch {
      setStatus("mislukt");
    }
  }

  /* --------------------------------- schermen -------------------------------- */

  if (fase === "intro") {
    return (
      <div ref={topRef} className="max-w-2xl">
        <h1 className="text-[2rem] sm:text-[2.6rem]">
          Hulp aanvragen bij Caritas BOAZ
        </h1>
        <p className="mt-6 text-muted-foreground sm:text-lg">
          Heeft u of uw organisatie financiële ondersteuning nodig? We helpen u
          stap voor stap met het indienen van een aanvraag.
        </p>
        <ul className="mt-6 space-y-2 text-muted-foreground">
          <li>Het invullen duurt ongeveer enkele minuten.</li>
          <li>U kunt tijdens het invullen altijd teruggaan en uw antwoorden aanpassen.</li>
        </ul>
        <Button
          className="mt-9 w-full px-8 py-4 text-base sm:w-auto"
          onClick={() => {
            setFase("stappen");
            naarStap(0);
          }}
        >
          Start aanvraag
        </Button>
      </div>
    );
  }

  if (fase === "verzonden") {
    return (
      <div
        ref={topRef}
        tabIndex={-1}
        role="status"
        className="max-w-2xl rounded-sm border border-sage-strong/40 bg-sage p-7 sm:p-10"
      >
        <h1 className="text-[1.9rem] sm:text-[2.4rem]">
          Uw aanvraag is verzonden
        </h1>
        <p className="mt-5">
          Bedankt voor uw aanvraag. Caritas BOAZ heeft uw gegevens ontvangen.
        </p>
        <p className="mt-3">
          Als er aanvullende informatie nodig is, neemt Caritas BOAZ contact met
          u op.
        </p>
        {bevestigdeCommissie ? (
          <p className="mt-3 text-muted-foreground">
            Uw aanvraag is gestuurd naar de {bevestigdeCommissie}.
          </p>
        ) : null}
        <ButtonLink to="/" variant="outline" className="mt-8 w-full sm:w-auto">
          Terug naar Caritas BOAZ
        </ButtonLink>
      </div>
    );
  }

  const gevraagd = gevraagdeBijdrage(data);
  const samenvatting = maakSamenvatting(data);
  const commissieId = commissieVoorPlaats(data.plaats);

  return (
    <div ref={topRef} className="scroll-mt-24">
      <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-clay">
        Aanvraag hulp
      </p>
      <div className="mt-4">
        <StepProgress labels={labels} current={stapIndex} />
      </div>

      <div className="mt-9 max-w-2xl">
        <h1 className="text-[1.7rem] sm:text-[2.2rem]">{stap.titel}</h1>

        <div className="mt-7 space-y-6">
          {stap.id === "voor-wie" ? (
            <>
              <div className="grid gap-4">
                <ChoiceCard
                  title="Persoon"
                  description="Ik vraag ondersteuning aan voor een persoon."
                  selected={data.aanvragerType === "persoon"}
                  onSelect={() => kiesAanvragerType("persoon")}
                />
                <ChoiceCard
                  title="Organisatie"
                  description="Ik vraag ondersteuning aan namens een organisatie of hulpverlener."
                  selected={data.aanvragerType === "organisatie"}
                  onSelect={() => kiesAanvragerType("organisatie")}
                />
              </div>
              <FieldError id="fout-aanvragerType" message={fouten.aanvragerType} />
            </>
          ) : null}

          {stap.id === "aanvrager" && data.aanvragerType === "organisatie" ? (
            <>
              <TextField
                label="Naam organisatie"
                name="organisatie"
                value={data.organisatie}
                onChange={(value) => set("organisatie", value)}
                autoComplete="organization"
                error={fouten.organisatie}
              />
              <TextField
                label="Naam hulpverlener"
                name="hulpverlenerNaam"
                value={data.hulpverlenerNaam}
                onChange={(value) => set("hulpverlenerNaam", value)}
                autoComplete="name"
                error={fouten.hulpverlenerNaam}
              />
              <TextField
                label="Telefoonnummer hulpverlener"
                name="hulpverlenerTelefoon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={data.hulpverlenerTelefoon}
                onChange={(value) => set("hulpverlenerTelefoon", value)}
                error={fouten.hulpverlenerTelefoon}
              />
              <TextField
                label="E-mailadres hulpverlener"
                name="hulpverlenerEmail"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={data.hulpverlenerEmail}
                onChange={(value) => set("hulpverlenerEmail", value)}
                error={fouten.hulpverlenerEmail}
              />
            </>
          ) : null}

          {stap.id === "aanvrager" && data.aanvragerType !== "organisatie" ? (
            <>
              <TextField
                label="Uw naam"
                name="eigenNaam"
                value={data.eigenNaam}
                onChange={(value) => set("eigenNaam", value)}
                autoComplete="name"
                error={fouten.eigenNaam}
              />
              <TextField
                label="Uw telefoonnummer"
                name="eigenTelefoon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={data.eigenTelefoon}
                onChange={(value) => set("eigenTelefoon", value)}
                error={fouten.eigenTelefoon}
              />
              <TextField
                label="Uw e-mailadres"
                name="eigenEmail"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={data.eigenEmail}
                onChange={(value) => set("eigenEmail", value)}
                error={fouten.eigenEmail}
              />
            </>
          ) : null}

          {stap.id === "ontvanger" ? (
            <>
              <TextField
                label="Voorletter(s) en achternaam"
                name="ontvangerNaam"
                value={data.ontvangerNaam}
                onChange={(value) => set("ontvangerNaam", value)}
                error={fouten.ontvangerNaam}
              />
              <TextField
                label="IBAN-nummer"
                name="ontvangerIban"
                value={data.ontvangerIban}
                onChange={(value) => set("ontvangerIban", value.toUpperCase())}
                placeholder="NL00 BANK 0000 0000 00"
                maxLength={40}
                hint="Het IBAN is nodig als financiële ondersteuning rechtstreeks aan de ontvanger wordt overgemaakt."
                error={fouten.ontvangerIban}
              />
            </>
          ) : null}

          {stap.id === "regio" ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {PLAATS_ROUTING.map((entry) => (
                  <ChoiceCard
                    key={entry.plaats}
                    title={entry.plaats}
                    selected={data.plaats === entry.plaats}
                    onSelect={() => set("plaats", entry.plaats)}
                  />
                ))}
              </div>
              <FieldError id="fout-plaats" message={fouten.plaats} />
              {commissieId ? (
                <p className="rounded-sm bg-sky px-4 py-3 text-sm">
                  Uw aanvraag wordt behandeld door de{" "}
                  <strong>{COMMISSIES[commissieId].naam}</strong>.
                </p>
              ) : null}
            </>
          ) : null}

          {stap.id === "hulpvraag" ? (
            <>
              <fieldset>
                <legend className="font-medium">Type ondersteuning</legend>
                <div className="mt-3 grid gap-4">
                  {HULP_TYPES.map((type) => (
                    <ChoiceCard
                      key={type.value}
                      title={type.value}
                      description={type.hint}
                      selected={data.hulpType === type.value}
                      onSelect={() => set("hulpType", type.value)}
                    />
                  ))}
                </div>
                <FieldError id="fout-hulpType" message={fouten.hulpType} />
              </fieldset>
              <TextAreaField
                label="Beschrijf kort waarvoor u ondersteuning vraagt."
                name="hulpOmschrijving"
                value={data.hulpOmschrijving}
                onChange={(value) => set("hulpOmschrijving", value)}
                placeholder="Leg in uw eigen woorden uit waarvoor u ondersteuning nodig heeft."
                hint="Een korte uitleg is voldoende."
                error={fouten.hulpOmschrijving}
              />
            </>
          ) : null}

          {stap.id === "kosten" ? (
            <>
              <BedragVeld
                label="Totale kosten"
                name="totaleKosten"
                value={data.totaleKosten}
                onChange={(value) => set("totaleKosten", value)}
                error={fouten.totaleKosten}
              />
              <BedragVeld
                label="Eigen bijdrage"
                name="eigenBijdrage"
                value={data.eigenBijdrage}
                onChange={(value) => set("eigenBijdrage", value)}
                hint="Heeft u geen eigen bijdrage? Vul dan 0 in."
                error={fouten.eigenBijdrage}
              />
              <div className="rounded-sm border border-border bg-sand p-5">
                <p className="font-medium">Bijdrage die u van Caritas BOAZ vraagt</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Dit bedrag wordt automatisch berekend: totale kosten min eigen
                  bijdrage.
                </p>
                <p className="mt-3 font-display text-2xl font-semibold">
                  {gevraagd === null ? "—" : formatEuro(gevraagd)}
                </p>
              </div>
            </>
          ) : null}

          {stap.id === "onderbouwing" ? (
            <>
              <TextAreaField
                label="Waarom is deze ondersteuning nodig?"
                name="onderbouwing"
                value={data.onderbouwing}
                onChange={(value) => set("onderbouwing", value)}
                rows={8}
                hint="U kunt hier ook aanvullende informatie geven die belangrijk is voor uw aanvraag."
                error={fouten.onderbouwing}
              />

              <div>
                <h2 className="font-display text-lg font-semibold">
                  Heeft u een offerte, factuur of ander document?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Dit is niet verplicht, tenzij dit voor uw aanvraag relevant is.
                  PDF, JPG, PNG of Word, maximaal 8 MB per bestand.
                </p>
                <label
                  htmlFor="bijlagen"
                  className="mt-4 flex min-h-28 cursor-pointer items-center justify-center rounded-sm border border-dashed border-border-strong bg-muted px-5 py-6 text-center font-display font-semibold transition-colors hover:border-primary hover:bg-secondary"
                >
                  + Bestand toevoegen
                </label>
                <input
                  id="bijlagen"
                  name="bijlagen"
                  type="file"
                  multiple
                  accept={UPLOAD.accept}
                  className="sr-only"
                  onChange={(event) => {
                    voegBestandenToe(event.target.files);
                    event.target.value = "";
                  }}
                />
                <FieldError id="fout-bijlagen" message={bestandsFout ?? undefined} />
                {data.bestanden.length ? (
                  <ul className="mt-4 space-y-2">
                    {data.bestanden.map((file) => (
                      <li
                        key={file.name}
                        className="flex items-center justify-between gap-4 rounded-sm border border-border px-4 py-3"
                      >
                        <span className="break-all">{file.name} ✓</span>
                        <button
                          type="button"
                          onClick={() =>
                            setData((huidig) => ({
                              ...huidig,
                              bestanden: huidig.bestanden.filter(
                                (item) => item.name !== file.name,
                              ),
                            }))
                          }
                          className="shrink-0 font-medium text-primary-soft underline underline-offset-4 hover:text-primary"
                        >
                          Verwijderen
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </>
          ) : null}

          {stap.id === "controleren" ? (
            <>
              <p className="text-muted-foreground">
                Controleer hieronder uw gegevens voordat u de aanvraag verzendt.
              </p>

              {samenvatting ? (
                <div className="divide-y divide-border rounded-sm border border-border">
                  {samenvatting.secties.map((sectie) => (
                    <section key={sectie.titel} className="p-5 sm:p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="font-display text-lg font-semibold">
                          {sectie.titel}
                        </h2>
                        <button
                          type="button"
                          onClick={() => naarStap(stapVoorSectie(sectie.titel))}
                          className="font-medium text-primary-soft underline underline-offset-4 hover:text-primary"
                        >
                          Wijzigen
                        </button>
                      </div>
                      <dl className="mt-3 space-y-2">
                        {sectie.regels.map((regel) => (
                          <div
                            key={regel.label + regel.waarde}
                            className="sm:flex sm:gap-4"
                          >
                            <dt className="text-sm text-muted-foreground sm:w-56 sm:shrink-0">
                              {regel.label}
                            </dt>
                            <dd className="whitespace-pre-line break-words">
                              {regel.waarde || "—"}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
              ) : null}

              <div className="rounded-sm border border-border bg-muted p-5">
                <label className="flex items-start gap-3 font-medium">
                  <input
                    type="checkbox"
                    name="verklaring"
                    checked={data.verklaring}
                    onChange={(event) => set("verklaring", event.target.checked)}
                    aria-invalid={Boolean(fouten.verklaring)}
                    className="mt-1 h-5 w-5 shrink-0 rounded-sm border-input accent-[var(--primary)]"
                  />
                  <span>
                    Ik heb de ingevulde gegevens gecontroleerd en verklaar dat
                    deze naar waarheid zijn ingevuld.
                  </span>
                </label>
                <FieldError id="fout-verklaring" message={fouten.verklaring} />
              </div>

              {status === "mislukt" || status === "niet-ingesteld" ? (
                <div
                  role="alert"
                  className="rounded-sm border border-destructive/40 bg-blush p-5"
                >
                  <p className="font-display font-semibold">
                    Het verzenden is helaas niet gelukt.
                  </p>
                  <p className="mt-2">
                    Uw ingevulde gegevens zijn behouden. Probeer het opnieuw.
                  </p>
                  {status === "niet-ingesteld" ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      De automatische verzending naar de commissie is nog niet
                      geactiveerd.
                    </p>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            {stapIndex > 0 ? (
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => naarStap(stapIndex - 1)}
              >
                Vorige
              </Button>
            ) : null}
            {stap.id === "controleren" ? (
              <Button
                className={cn("w-full px-8 py-4 text-base sm:w-auto")}
                disabled={status === "bezig"}
                onClick={() => void verstuur()}
              >
                {status === "bezig"
                  ? "Bezig met verzenden…"
                  : status === "mislukt" || status === "niet-ingesteld"
                    ? "Opnieuw proberen"
                    : "Aanvraag verzenden"}
              </Button>
            ) : stap.id === "voor-wie" ? null : (
              <Button className="w-full sm:w-auto" onClick={() => volgende()}>
                Volgende stap
              </Button>
            )}
          </div>
          <SavedHint
            show={opgeslagen && stapIsCompleet(stap.id, data) && stapIndex > 0}
          />
        </div>
      </div>
    </div>
  );
}

function stapVoorSectie(titel: string): number {
  const map: Record<string, StapId> = {
    Aanvrager: "aanvrager",
    Ontvanger: "ontvanger",
    Regio: "regio",
    Hulpvraag: "hulpvraag",
    Kosten: "kosten",
    Onderbouwing: "onderbouwing",
    Bijlagen: "onderbouwing",
  };
  const id = map[titel];
  const index = STAPPEN.findIndex((item) => item.id === id);
  return index < 0 ? 0 : index;
}

function BedragVeld({
  label,
  name,
  value,
  onChange,
  hint,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
}) {
  const bedrag = parseBedrag(value);
  return (
    <div>
      <label htmlFor={`veld-${name}`} className="block font-medium">
        {label}
      </label>
      {hint ? (
        <p id={`hint-${name}`} className="mt-1 text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <div className="mt-2 flex items-center gap-3">
        <span aria-hidden="true" className="font-display text-lg font-semibold">
          €
        </span>
        <input
          id={`veld-${name}`}
          name={name}
          type="text"
          inputMode="decimal"
          value={value}
          maxLength={12}
          placeholder="0"
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [error ? `fout-${name}` : null, hint ? `hint-${name}` : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className="w-full rounded-sm border border-input bg-background px-4 py-3.5 text-base transition-colors hover:border-border-strong focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[invalid=true]:border-destructive"
        />
      </div>
      {bedrag !== null ? (
        <p className="mt-2 text-sm text-muted-foreground">{formatEuro(bedrag)}</p>
      ) : null}
      <FieldError id={`fout-${name}`} message={error} />
    </div>
  );
}

