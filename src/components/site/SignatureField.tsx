import { useEffect, useId, useRef } from "react";
import SignaturePad from "signature_pad";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/site/primitives";
import { FieldError } from "@/components/site/wizard-ui";
import { cn } from "@/lib/utils";

export function SignatureField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const valueRef = useRef(value);
  const errorId = useId();

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pad = new SignaturePad(canvas, {
      minWidth: 1,
      maxWidth: 2.4,
      penColor: "#233f58",
      backgroundColor: "rgba(255,255,255,0)",
    });
    padRef.current = pad;

    const resize = () => {
      const current = valueRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      canvas.getContext("2d")?.scale(ratio, ratio);
      pad.clear();
      if (current) void pad.fromDataURL(current, { ratio: 1 });
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const save = () => {
      if (!pad.isEmpty()) onChange(pad.toDataURL("image/png"));
    };
    pad.addEventListener("endStroke", save);

    return () => {
      pad.removeEventListener("endStroke", save);
      observer.disconnect();
      pad.off();
      padRef.current = null;
    };
  }, [onChange]);

  function clear() {
    padRef.current?.clear();
    onChange("");
    canvasRef.current?.focus();
  }

  return (
    <div className="flex h-full min-h-72 flex-col rounded-sm border border-border bg-background p-5 sm:p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <label htmlFor="handtekening-canvas" className="block font-medium">
            Handtekening
          </label>
          <p id="handtekening-uitleg" className="mt-1 text-sm text-muted-foreground">
            Teken met uw muis, pen of vinger in het vlak.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="h-9 shrink-0 px-2.5 text-sm"
          onClick={clear}
          disabled={!value}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Wissen
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        id="handtekening-canvas"
        data-field="handtekening"
        tabIndex={0}
        role="img"
        aria-label="Teken hier uw handtekening"
        aria-describedby={`handtekening-uitleg${error ? ` ${errorId}` : ""}`}
        aria-invalid={Boolean(error)}
        className={cn(
          "mt-4 h-40 w-full touch-none rounded-sm border bg-muted/35 outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-44",
          error ? "border-destructive" : "border-input hover:border-border-strong",
        )}
      />
      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>Handtekening</span>
        <span aria-live="polite">{value ? "Geplaatst" : "Nog leeg"}</span>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}