import { cn } from "@/lib/utils";

type BrandNameProps = {
  className?: string;
};

export function BrandName({ className }: BrandNameProps) {
  return (
    <span
      aria-label="Caritas BOAZ"
      className={cn(
        "inline-flex items-baseline whitespace-nowrap font-display text-xl font-bold leading-none tracking-normal sm:text-2xl",
        className,
      )}
    >
      <span className="text-foreground">Caritas</span>{" "}
      <span aria-hidden="true" className="text-sand-strong">B</span>
      <span aria-hidden="true" className="text-sky-strong">O</span>
      <span aria-hidden="true" className="text-clay">A</span>
      <span aria-hidden="true" className="text-sage-strong">Z</span>
    </span>
  );
}