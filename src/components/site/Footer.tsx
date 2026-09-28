import { Link } from "@tanstack/react-router";
import { Container } from "./primitives";
import logoAsset from "@/assets/caritas-boaz-logo.png.asset.json";

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
          <div className="min-w-0">
            <Link
              to="/"
              aria-label="Caritas BOAZ — naar de homepagina"
              className="inline-flex rounded-sm bg-background px-3 py-2 transition-opacity hover:opacity-90"
            >
              <img
                src={logoAsset.url}
                alt="Caritas BOAZ"
                className="h-12 w-auto object-contain sm:h-14"
                width="1920"
                height="683"
              />
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-footer-muted sm:text-sm sm:leading-snug">
              Bloemendaal · Overveen · Aerdenhout · Zandvoort
            </p>
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
