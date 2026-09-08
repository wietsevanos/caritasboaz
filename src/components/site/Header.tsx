import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "./primitives";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/92 backdrop-blur-[6px]"
          : "border-b border-transparent bg-background",
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link
            to="/"
            className="font-display text-[0.95rem] font-bold uppercase tracking-[0.16em] text-foreground"
            onClick={() => setOpen(false)}
          >
            Caritas BOAZ
          </Link>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    activeProps={{ className: "text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground" }}
                    className="link-underline text-[0.95rem] font-medium transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/hulp-aanvragen"
              className="inline-flex rounded-sm bg-primary px-4 py-2.5 font-display text-[0.85rem] font-semibold text-primary-foreground transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-soft sm:px-5 sm:text-[0.9rem]"
            >
              Hulp aanvragen
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobiel-menu"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobiel-menu" className="border-t border-border bg-background lg:hidden">
          <Container size="wide">
            <nav aria-label="Mobiele navigatie" className="py-3">
              <ul className="divide-y divide-border">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: link.to === "/" }}
                      activeProps={{ className: "text-foreground" }}
                      className="block py-4 font-display text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/hulp-aanvragen"
                onClick={() => setOpen(false)}
                className="mt-5 mb-4 flex w-full items-center justify-center rounded-sm bg-primary px-5 py-4 font-display font-semibold text-primary-foreground"
              >
                Hulp aanvragen
              </Link>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
