import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3.5 text-base transition-colors placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[invalid=true]:border-destructive";

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
        "flex w-full flex-col gap-2 rounded-sm border p-5 text-left transition-colors sm:p-6",
        selected
          ? "border-primary bg-sky"
          : "border-border-strong bg-background hover:border-primary hover:bg-secondary",
      )}
    >
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
        <span className="text-muted-foreground">{description}</span>
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
    <div>
      <ol className="hidden flex-wrap items-center gap-x-2 gap-y-1 text-sm md:flex">
        {labels.map((label, index) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                index === current
                  ? "font-semibold text-foreground"
                  : index < current
                    ? "text-primary-soft"
                    : "text-muted-foreground",
              )}
              aria-current={index === current ? "step" : undefined}
            >
              {label}
            </span>
            {index < labels.length - 1 ? (
              <span aria-hidden="true" className="text-border-strong">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm font-medium text-muted-foreground md:mt-4">
        Stap {current + 1} van {labels.length}:{" "}
        <span className="text-foreground">{labels[current]}</span>
      </p>
      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-sm bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label="Voortgang van uw aanvraag"
      >
        <div
          className="h-full rounded-sm bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
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
