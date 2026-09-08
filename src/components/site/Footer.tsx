import { Link } from "@tanstack/react-router";
import { PLACES } from "@/lib/site";
import { Container } from "./primitives";

const FOOTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/over-ons", label: "Over ons" },
  { to: "/geschiedenis", label: "Geschiedenis" },
  { to: "/voorbeelden", label: "Voorbeelden" },
  { to: "/hulp-aanvragen", label: "Hulp aanvragen" },
  { to: "/contact", label: "Contact" },
  { to: "/privacyverklaring", label: "Privacyverklaring" },
] as const;

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <Container size="wide">
        <div className="grid gap-10 py-14 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] sm:py-16">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em]">
              Caritas BOAZ
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-footer-muted">
              {PLACES.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
            <p className="mt-6 max-w-sm text-sm text-footer-muted">
              Caritas BOAZ zijn we samen.
            </p>
          </div>
          <nav aria-label="Footernavigatie">
            <ul className="grid gap-3 sm:grid-cols-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline text-footer-muted transition-colors hover:text-footer-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-footer-foreground/15 py-6 text-sm text-footer-muted">
          <p>
            © {new Date().getFullYear()} PCI Caritas BOAZ — Bloemendaal,
            Overveen, Aerdenhout en Zandvoort.
          </p>
        </div>
      </Container>
    </footer>
  );
}
