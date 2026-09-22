import { createServerFn } from "@tanstack/react-start";
import {
  LEGE_AANVRAAG,
  STAPPEN,
  maakSamenvatting,
  valideerStap,
  type AanvraagData,
  type AanvraagSamenvatting,
} from "./aanvraag";

export type VerzendResultaat =
  | { status: "verzonden"; commissie: string; datum: string }
  | { status: "mail-niet-ingesteld"; commissie: string }
  | { status: "ongeldig"; melding: string };

/**
 * TESTFASE: alle aanvragen gaan naar dit adres, niet naar de commissies.
 * Zet dit op `null` zodra het afzenderdomein van Caritas BOAZ is geverifieerd;
 * dan gaat de aanvraag automatisch naar samenvatting.commissie.email.
 */
const TEST_ONTVANGER: string | null = "wietsevanos@gmail.com";

/** Resend-testafzender: werkt zonder eigen domein of DNS-instellingen. */
const AFZENDER = "Caritas BOAZ <onboarding@resend.dev>";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function maakHtml(
  samenvatting: AanvraagSamenvatting,
  testAdres: string | null,
): string {
  const secties = samenvatting.secties
    .map((sectie) => {
      const regels = sectie.regels
        .map(
          (regel) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#5b6b78;font-size:13px;vertical-align:top;width:190px">${escapeHtml(
              regel.label,
            )}</td><td style="padding:6px 0;color:#1f3140;font-size:14px;white-space:pre-wrap">${escapeHtml(
              regel.waarde,
            )}</td></tr>`,
        )
        .join("");
      return `<h2 style="margin:24px 0 6px;font-size:15px;color:#2f506b">${escapeHtml(
        sectie.titel,
      )}</h2><table style="width:100%;border-collapse:collapse;border-top:1px solid #e3e8ec">${regels}</table>`;
    })
    .join("");

  const testmelding = testAdres
    ? `<p style="margin:0 0 18px;padding:10px 12px;background:#fdf1ea;border:1px solid #e8cbbc;color:#7a4429;font-size:13px">Testfase: deze aanvraag is naar ${escapeHtml(
        testAdres,
      )} gestuurd. Normaal zou deze naar ${escapeHtml(
        samenvatting.commissie.naam,
      )} (${escapeHtml(samenvatting.commissie.email)}) gaan.</p>`
    : "";

  return `<!doctype html><html lang="nl"><body style="margin:0;background:#f5f8fa;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:640px;margin:0 auto;padding:28px 24px;background:#ffffff">
<h1 style="margin:0 0 6px;font-size:20px;color:#1f3140">Nieuwe hulpaanvraag Caritas BOAZ</h1>
<p style="margin:0 0 18px;color:#5b6b78;font-size:14px">Bestemd voor ${escapeHtml(
    samenvatting.commissie.naam,
  )}.</p>
${testmelding}
${secties}
<h2 style="margin:24px 0 6px;font-size:15px;color:#2f506b">Handtekening</h2>
<img src="cid:handtekening" alt="Handtekening" width="280" style="max-width:280px;border:1px solid #e3e8ec" />
<p style="margin:8px 0 0;color:#5b6b78;font-size:12px">Ziet u de handtekening niet? Kijk dan in de bijlage <em>handtekening.png</em> of in de PDF van de aanvraag.</p>

</div></body></html>`;
}

/**
 * Verzendt de aanvraag per e-mail. In de testfase gaat elke aanvraag naar
 * TEST_ONTVANGER; daarna automatisch naar de commissie die bij de plaats hoort.
 */
export const verzendAanvraag = createServerFn({ method: "POST" })
  .inputValidator(
    (input: { aanvraag: AanvraagData; pdfBase64?: string | undefined }) => input,
  )
  .handler(async ({ data }): Promise<VerzendResultaat> => {
    const aanvraag: AanvraagData = { ...LEGE_AANVRAAG, ...data.aanvraag };

    for (const stap of STAPPEN) {
      const fouten = valideerStap(stap.id, aanvraag);
      const eerste = Object.values(fouten)[0];
      if (eerste) return { status: "ongeldig", melding: eerste };
    }

    const samenvatting = maakSamenvatting(aanvraag);
    if (!samenvatting) {
      return { status: "ongeldig", melding: "Kies een plaats om verder te gaan." };
    }

    const lovableKey = process.env["LOVABLE_API_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    if (!lovableKey || !resendKey) {
      return {
        status: "mail-niet-ingesteld",
        commissie: samenvatting.commissie.naam,
      };
    }

    const ontvanger = TEST_ONTVANGER ?? samenvatting.commissie.email;
    const datumSlug = new Date().toISOString().slice(0, 10);

    type Bijlage = {
      filename: string;
      content: string;
      content_id?: string;
      content_type?: string;
    };
    const bijlagen: Bijlage[] = [];

    // Handtekening als inline bijlage: data-URL's worden door Gmail geblokkeerd.
    const handtekeningBase64 = samenvatting.handtekening.includes(",")
      ? samenvatting.handtekening.slice(samenvatting.handtekening.indexOf(",") + 1)
      : "";
    if (handtekeningBase64) {
      bijlagen.push({
        filename: "handtekening.png",
        content: handtekeningBase64,
        content_id: "handtekening",
        content_type: "image/png",
      });
    }

    if (data.pdfBase64) {
      bijlagen.push({
        filename: `caritas-boaz-aanvraag-${datumSlug}.pdf`,
        content: data.pdfBase64,
        content_type: "application/pdf",
      });
    }

    for (const bestand of aanvraag.bestanden) {
      if (!bestand.content) continue;
      bijlagen.push({ filename: bestand.name, content: bestand.content });
    }

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: AFZENDER,
        to: [ontvanger],
        subject: "Nieuwe hulpaanvraag Caritas BOAZ",
        html: maakHtml(samenvatting, TEST_ONTVANGER),
        attachments: bijlagen,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Resend verzending mislukt [${response.status}]: ${body}`);
      throw new Error(`E-mail verzenden mislukt [${response.status}]`);
    }

    return {
      status: "verzonden",
      commissie: samenvatting.commissie.naam,
      datum: new Date().toISOString(),
    };
  });
