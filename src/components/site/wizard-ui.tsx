import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3.5 text-base shadow-[inset_0_1px_0_color-mix(in_oklab,var(--primary)_3%,transparent)] transition-[border-color,box-shadow,background-color] placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-primary focus:bg-background focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[invalid=true]:border-destructive";

export function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
  name,
}: {
  label: string;
  hint?: ReactNode | undefined;
  error?: string | undefined;
  name: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    name: string;
  }) => ReactNode;
}) {
  const base = useId();
  const id = `${base}-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {children({
        id,
        name,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function TextField({
  label,
  hint,
  error,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  maxLength = 200,
}: {
  label: string;
  hint?: ReactNode | undefined;
  error?: string | undefined;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  autoComplete?: string | undefined;
  inputMode?: "text" | "email" | "tel" | "decimal" | undefined;
  placeholder?: string | undefined;
  maxLength?: number;
}) {
  return (
    <Field label={label} hint={hint} error={error} name={name}>
      {(props) => (
        <input
          {...props}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          maxLength={maxLength}
          className={inputClass}
        />
      )}
    </Field>
  );
}

export function TextAreaField({
  label,
  hint,
  error,
  name,
  value,
  onChange,
  placeholder,
  rows = 6,
  maxLength = 2000,
}: {
  label: string;
  hint?: ReactNode | undefined;
  error?: string | undefined;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string | undefined;
  rows?: number;
  maxLength?: number;
}) {
  return (
    <Field label={label} hint={hint} error={error} name={name}>
      {(props) => (
        <textarea
          {...props}
          value={value}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(inputClass, "resize-y leading-relaxed")}
        />
      )}
    </Field>
  );
}

export function ChoiceCard({
  title,
  description,
  selected,
  onSelect,
}: {
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative flex min-h-28 w-full flex-col justify-center gap-2 overflow-hidden rounded-sm border p-5 text-left transition-[border-color,background-color,transform,box-shadow] sm:p-6",
        selected
          ? "border-primary bg-sky shadow-[0_10px_30px_color-mix(in_oklab,var(--primary)_8%,transparent)]"
          : "border-border-strong bg-background hover:-translate-y-0.5 hover:border-primary hover:bg-secondary hover:shadow-[0_10px_30px_color-mix(in_oklab,var(--primary)_6%,transparent)]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-0 w-1 bg-clay transition-transform",
          selected ? "translate-x-0" : "-translate-x-full group-hover:translate-x-0",
        )}
      />
      <span className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border",
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border-strong bg-background",
          )}
        >
          {selected ? (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path
                d="M3.5 8.5l3 3 6-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
        <span className="font-display text-lg font-semibold">{title}</span>
      </span>
      {description ? (
        <span className="pl-8 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</span>
      ) : null}
    </button>
  );
}

export function StepProgress({
  labels,
  current,
}: {
  labels: string[];
  current: number;
}) {
  const percentage = Math.round(((current + 1) / labels.length) * 100);
  return (
    <div className="rounded-sm border border-primary/10 bg-sky/55 p-4 sm:p-5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary font-display text-sm font-semibold text-primary-foreground shadow-[0_6px_18px_color-mix(in_oklab,var(--primary)_18%,transparent)]">
          {current + 1}
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary-soft">Uw aanvraag</p>
          <p className="mt-0.5 truncate font-display text-sm font-semibold text-foreground sm:text-base">
            {labels[current]}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-muted-foreground">Stap {current + 1} van {labels.length}</p>
          <p className="mt-0.5 font-display text-sm font-semibold tabular-nums text-primary" aria-hidden="true">{percentage}%</p>
        </div>
      </div>
      <div
        className="mt-4 grid h-1.5 w-full gap-1"
        style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label="Voortgang van uw aanvraag"
      >
        {labels.map((label, index) => (
          <span
            key={label}
            aria-hidden="true"
            className={cn(
              "h-full rounded-sm transition-colors duration-300 motion-reduce:transition-none",
              index < current ? "bg-sage-strong" : index === current ? "bg-clay" : "bg-background",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function SavedHint({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p className="text-sm font-medium text-sage-strong" role="status">
      ✓ Gegevens opgeslagen
    </p>
  );
}
