import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

const toneClasses = {
  white: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  sky: "bg-sky text-foreground",
  sage: "bg-sage text-foreground",
  sand: "bg-sand text-foreground",
  blush: "bg-blush text-foreground",
  primary: "bg-primary text-primary-foreground",
} as const;

export function Section({
  children,
  className,
  tone = "white",
  id,
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof toneClasses;
  id?: string;
  as?: "section" | "div";
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-28",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-soft",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Statement({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "h2" | "blockquote";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-display text-[0.95rem] font-semibold tracking-tight transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out will-change-transform disabled:pointer-events-none disabled:opacity-60";

const buttonVariants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-soft hover:-translate-y-0.5",
  outline:
    "border border-border-strong bg-background text-foreground hover:border-primary hover:bg-secondary hover:-translate-y-0.5",
  clay: "bg-clay text-primary-foreground hover:-translate-y-0.5 hover:brightness-[1.06]",
  ghostLight:
    "border border-primary-foreground/35 text-primary-foreground hover:-translate-y-0.5 hover:bg-primary-foreground/10",
} as const;

type ButtonVariant = keyof typeof buttonVariants;

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      to={to as never}
      className={cn(buttonBase, buttonVariants[variant], className)}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(buttonBase, buttonVariants[variant], className)}
    >
      {children}
    </button>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error generic element ref
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className="mt-4 text-[1.8rem] sm:text-4xl lg:text-[2.6rem]"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-muted-foreground sm:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}
