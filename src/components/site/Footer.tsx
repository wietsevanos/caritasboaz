import { Link } from "@tanstack/react-router";
import { Container } from "./primitives";

const FOOTER_LINKS = [
  { to: "/over-ons", label: "Over ons" },
  { to: "/voorbeelden", label: "Voorbeelden" },
  { to: "/hulp-aanvragen", label: "Hulp aanvragen" },
  { to: "/contact", label: "Contact" },
  { to: "/privacyverklaring", label: "Privacy" },
] as const;

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-6 py-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em]">
              Caritas BOAZ
            </p>
            <p className="mt-1 text-xs text-footer-muted">
              Bloemendaal · Overveen · Aerdenhout · Zandvoort
            </p>
          </div>
          <nav aria-label="Footernavigatie">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-footer-muted">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-footer-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-footer-foreground/15 py-5 text-xs text-footer-muted">
          <p>
            © {new Date().getFullYear()} Caritas BOAZ. Alle rechten voorbehouden.
          </p>
        </div>
      </Container>
    </footer>
  );
}
