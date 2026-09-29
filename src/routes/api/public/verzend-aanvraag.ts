import { createFileRoute } from "@tanstack/react-router";

import { verzendAanvraagMail } from "@/lib/aanvraag.functions";
import type { AanvraagData } from "@/lib/aanvraag";

/**
 * Publiek eindpunt voor de statische versie van de site (DirectAdmin).
 * De statische site kan zelf geen e-mail versturen; deze route draait op de
 * gepubliceerde Lovable-versie en verstuurt via Resend. De Resend-sleutel
 * blijft daardoor server-side en komt nooit in de statische site terecht.
 */

// Alleen de eigen sites mogen dit eindpunt vanuit de browser aanroepen.
const TOEGESTANE_ORIGINS = new Set([
  "https://pcicaritasboaz.nl",
  "https://www.pcicaritasboaz.nl",
  "https://caritasboaz.lovable.app",
  "http://localhost:8080",
]);

function corsHeaders(origin: string | null): HeadersInit {
  const toegestaan = origin && TOEGESTANE_ORIGINS.has(origin) ? origin : null;
  return {
    ...(toegestaan ? { "Access-Control-Allow-Origin": toegestaan } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export const Route = createFileRoute("/api/public/verzend-aanvraag")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) => {
        return new Response(null, {
          status: 204,
          headers: corsHeaders(request.headers.get("origin")),
        });
      },
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        const headers = corsHeaders(origin);

        // Zonder bekende herkomst (of van een vreemde site) weigeren we.
        if (!origin || !TOEGESTANE_ORIGINS.has(origin)) {
          return Response.json(
            { status: "mislukt" },
            { status: 403, headers },
          );
        }

        let body: { aanvraag?: AanvraagData; pdfBase64?: string };
        try {
          body = await request.json();
        } catch {
          return Response.json(
            { status: "ongeldig", melding: "Ongeldig verzoek." },
            { status: 400, headers },
          );
        }

        if (!body || typeof body !== "object" || !body.aanvraag) {
          return Response.json(
            { status: "ongeldig", melding: "Ongeldig verzoek." },
            { status: 400, headers },
          );
        }

        try {
          const resultaat = await verzendAanvraagMail({
            aanvraag: body.aanvraag,
            pdfBase64: body.pdfBase64,
          });
          return Response.json(resultaat, { headers });
        } catch (error) {
          console.error(error);
          return Response.json({ status: "mislukt" }, { status: 500, headers });
        }
      },
    },
  },
});
