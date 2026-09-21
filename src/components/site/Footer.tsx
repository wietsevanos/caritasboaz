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
        <div className="flex flex-col gap-6 pt-8 pb-6 sm:gap-9 sm:pt-10 sm:pb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex items-start gap-3 sm:gap-4">
            <img
              src={logoAsset.url}
              alt=""
              className="h-11 w-11 rounded-sm object-contain sm:h-16 sm:w-16"
              width="64"
              height="64"
              aria-hidden="true"
            />
            <div className="min-w-0 sm:pt-1">
              <p className="font-display text-base font-bold uppercase tracking-[0.14em] sm:text-xl">
                Caritas BOAZ
              </p>
              <p className="mt-1 text-xs leading-relaxed text-footer-muted sm:mt-1.5 sm:text-sm sm:leading-snug">
                Bloemendaal · Overveen · Aerdenhout · Zandvoort
              </p>
            </div>
          </div>

          <nav aria-label="Footernavigatie">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-footer-muted sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-2 sm:text-[0.95rem]">
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

        <div className="border-t border-footer-foreground/15 pt-4 pb-20 text-xs text-footer-muted sm:py-6 sm:text-sm lg:pb-6">
          <p>
            © {new Date().getFullYear()} Caritas BOAZ. Alle rechten voorbehouden.
          </p>
        </div>
      </Container>
    </footer>
  );
}
