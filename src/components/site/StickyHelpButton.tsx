import { Link } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";

export function StickyHelpButton() {
  return (
    <Link
      to="/hulp-aanvragen"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-3 font-display text-sm font-semibold text-primary-foreground shadow-sm transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-soft lg:hidden"
    >
      <HeartHandshake className="h-4 w-4" aria-hidden="true" />
      Hulp aanvragen
    </Link>
  );
}
