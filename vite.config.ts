// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Alle pagina's worden bij de build als statische HTML weggeschreven,
    // zodat de site ook op gewone webhosting (DirectAdmin) werkt.
    // Alleen de verzending van het aanvraagformulier loopt nog via de
    // gepubliceerde Lovable-versie (/api/public/verzend-aanvraag).
    pages: [
      { path: "/" },
      { path: "/over-ons" },
      { path: "/geschiedenis" },
      { path: "/voorbeelden" },
      { path: "/hulp-aanvragen" },
      { path: "/contact" },
      { path: "/privacyverklaring" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
