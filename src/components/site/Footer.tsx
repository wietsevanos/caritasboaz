import { Link } from "@tanstack/react-router";
import { Container } from "./primitives";
import logoAsset from "@/assets/logo.png.asset.json";

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
        <div className="flex flex-col items-start justify-between gap-8 pt-8 pb-32 sm:flex-row sm:items-center sm:gap-6 sm:pb-8">
          <div className="flex items-center gap-3.5">
            <img
              src={logoAsset.url}
              alt=""
              className="h-8 w-8 rounded-sm object-contain"
              width="32"
              height="32"
              aria-hidden="true"
            />
            <div>
              <p className="font-display text-base font-bold uppercase tracking-[0.16em]">
                Caritas BOAZ
              </p>
              <p className="mt-0.5 text-sm text-footer-muted">
                Bloemendaal · Overveen · Aerdenhout · Zandvoort
              </p>
            </div>
          </div>
          <nav aria-label="Footernavigatie">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-footer-muted sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
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
