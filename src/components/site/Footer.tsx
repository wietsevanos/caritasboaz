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
        <div className="flex flex-col gap-9 pt-10 pb-28 sm:pb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex items-start gap-4">
            <img
              src={logoAsset.url}
              alt=""
              className="h-14 w-14 rounded-sm object-contain sm:h-16 sm:w-16"
              width="64"
              height="64"
              aria-hidden="true"
            />
            <div className="pt-1">
              <p className="font-display text-lg font-bold uppercase tracking-[0.14em] sm:text-xl">
                Caritas BOAZ
              </p>
              <p className="mt-1.5 text-sm leading-snug text-footer-muted">
                Bloemendaal · Overveen · Aerdenhout · Zandvoort
              </p>
            </div>
          </div>

          <nav aria-label="Footernavigatie">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[0.95rem] text-footer-muted sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-block transition-colors hover:text-footer-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-footer-foreground/15 py-6 pb-24 text-sm text-footer-muted sm:pb-6 lg:pb-6">
          <p>
            © {new Date().getFullYear()} Caritas BOAZ. Alle rechten voorbehouden.
          </p>
        </div>
      </Container>
    </footer>
  );
}
