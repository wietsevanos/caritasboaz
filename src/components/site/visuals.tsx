import { cn } from "@/lib/utils";

/** Abstracte compositie voor de hero: verbondenheid via lijnen en vlakken. */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative aspect-[4/5] w-full sm:aspect-[5/4]", className)}
    >
      <div className="absolute inset-0 rounded-sm bg-sky/70" />
      <div className="anim-drift absolute left-[6%] top-[10%] h-28 w-28 rounded-sm bg-sage-strong/25 sm:h-36 sm:w-36" />
      <div className="anim-drift-x absolute bottom-[12%] right-[8%] h-24 w-40 rounded-sm bg-sand-strong/60" />
      <div className="anim-drift absolute right-[22%] top-[18%] h-16 w-16 rounded-sm bg-clay/30 [animation-duration:22s]" />
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <g stroke="var(--primary)" strokeWidth="1" opacity="0.35" fill="none">
          <path className="anim-dash" d="M20 300 C120 260 160 120 380 90" />
          <path
            className="anim-dash [animation-duration:34s]"
            d="M10 200 C140 220 220 300 390 250"
          />
          <path
            className="anim-dash [animation-duration:44s]"
            d="M40 60 C150 140 260 60 370 180"
          />
        </g>
        <g fill="var(--primary)">
          <circle className="anim-pulse-dot" cx="120" cy="248" r="4" />
          <circle
            className="anim-pulse-dot [animation-delay:1.6s]"
            cx="270"
            cy="122"
            r="4"
          />
          <circle
            className="anim-pulse-dot [animation-delay:3.2s]"
            cx="196"
            cy="300"
            r="4"
          />
          <circle
            className="anim-pulse-dot [animation-delay:4.4s]"
            cx="330"
            cy="228"
            r="4"
          />
        </g>
      </svg>
      <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-primary/10" />
    </div>
  );
}

/** Rustig bewegend veld van gelijkmatig verdeelde horizontale lijnen. */
export function LineField({
  className,
  stroke = "var(--primary)",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 300"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <g stroke={stroke} strokeWidth="1" fill="none" opacity="0.22">
        {[35, 80, 125, 170, 215, 260].map((y, i) => (
          <line
            key={i}
            className="anim-dash"
            style={{ animationDuration: `${28 + i * 6}s` }}
            x1="-20"
            y1={y}
            x2="620"
            y2={y}
          />
        ))}
      </g>
    </svg>
  );
}

/** Zacht bewegende kleurvlakken voor CTA-secties. */
export function DriftingShapes({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <div className="anim-drift absolute -left-10 top-6 h-40 w-40 rounded-sm bg-primary-foreground/10" />
      <div className="anim-drift-x absolute right-8 top-1/2 h-24 w-56 rounded-sm bg-primary-foreground/[0.07]" />
      <div className="anim-drift absolute bottom-0 left-1/3 h-28 w-28 rounded-sm bg-primary-foreground/[0.06] [animation-duration:26s]" />
    </div>
  );
}
