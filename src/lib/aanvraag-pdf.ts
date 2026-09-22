import type { AanvraagSamenvatting } from "@/lib/aanvraag";

export function aanvraagPdfBestandsnaam(): string {
  return `caritas-boaz-aanvraag-${new Date().toISOString().slice(0, 10)}.pdf`;
}

async function bouwPdf(samenvatting: AanvraagSamenvatting) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const addPageIfNeeded = (height: number) => {
    if (y + height <= pageHeight - 16) return;
    pdf.addPage();
    y = 20;
  };

  // Rustige kop: één doorlopende donkerblauwe lijn met direct eronder
  // een dunnere oranje lijn, beide over de volledige breedte.
  pdf.setFillColor(48, 79, 105);
  pdf.rect(0, 0, pageWidth, 2.5, "F");
  pdf.setFillColor(181, 104, 69);
  pdf.rect(0, 2.5, pageWidth, 0.9, "F");

  pdf.setTextColor(48, 79, 105);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("CARITAS BOAZ", margin, y);
  y += 8;
  pdf.setTextColor(27, 38, 52);
  pdf.setFontSize(20);
  pdf.text("Aanvraag financiële ondersteuning", margin, y);
  y += 7;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(102, 112, 124);
  pdf.text(
    `Datum: ${new Intl.DateTimeFormat("nl-NL", { timeZone: "Europe/Amsterdam" }).format(new Date())}`,
    margin,
    y,
  );
  y += 5;
  pdf.text(`Bestemming: ${samenvatting.commissie.naam}`, margin, y);
  y += 9;

  for (const sectie of samenvatting.secties) {
    const regels = sectie.regels.flatMap((regel) => {
      const waarde = regel.waarde || "—";
      const tekst = `${regel.label}: ${waarde}`;
      return pdf.splitTextToSize(tekst, contentWidth - 10) as string[];
    });
    const hasSignature = sectie.titel === "Datum & ondertekening" && samenvatting.handtekening;
    const boxHeight = 8 + regels.length * 4.6 + (hasSignature ? 16 : 0);
    addPageIfNeeded(boxHeight + 3);

    pdf.setFillColor(245, 248, 250);
    pdf.setDrawColor(220, 226, 231);
    pdf.roundedRect(margin, y, contentWidth, boxHeight, 1.5, 1.5, "FD");
    y += 5;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    pdf.setTextColor(48, 79, 105);
    pdf.text(sectie.titel, margin + 5, y);
    y += 4.6;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(43, 52, 63);

    for (const regel of sectie.regels) {
      const lines = pdf.splitTextToSize(`${regel.label}: ${regel.waarde || "—"}`, contentWidth - 10) as string[];
      pdf.text(lines, margin + 5, y);
      y += lines.length * 4.6;
    }
    if (hasSignature) {
      try {
        pdf.addImage(samenvatting.handtekening, "PNG", margin + 5, y, 44, 14, undefined, "FAST");
        y += 16;
      } catch {
        pdf.setTextColor(102, 112, 124);
        pdf.text("Handtekening is geplaatst.", margin + 5, y);
        y += 5;
      }
    }
    y += 2.5;
  }

  const pageCount = pdf.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    pdf.setPage(page);
    pdf.setDrawColor(220, 226, 231);
    pdf.line(margin, pageHeight - 17, pageWidth - margin, pageHeight - 17);
    pdf.setFontSize(8.5);
    pdf.setTextColor(102, 112, 124);
    pdf.text(
      "Dit document is lokaal aangemaakt vanuit de aanvraag bij Caritas BOAZ.",
      margin,
      pageHeight - 11,
    );
  }
  return pdf;
}

export async function downloadAanvraagPdf(samenvatting: AanvraagSamenvatting) {
  const pdf = await bouwPdf(samenvatting);
  pdf.save(aanvraagPdfBestandsnaam());
}

/** PDF van de aanvraag als base64 (zonder data-prefix), voor de e-mailbijlage. */
export async function maakAanvraagPdfBase64(
  samenvatting: AanvraagSamenvatting,
): Promise<string> {
  const pdf = await bouwPdf(samenvatting);
  const uri = pdf.output("datauristring");
  return uri.slice(uri.indexOf(",") + 1);
}