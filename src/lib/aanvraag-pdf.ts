import type { AanvraagSamenvatting } from "@/lib/aanvraag";

export function aanvraagPdfBestandsnaam(): string {
  return `caritas-boaz-aanvraag-${new Date().toISOString().slice(0, 10)}.pdf`;
}

async function bouwPdf(samenvatting: AanvraagSamenvatting) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 22;

  const addPageIfNeeded = (height: number) => {
    if (y + height <= pageHeight - 20) return;
    pdf.addPage();
    y = 22;
  };

  pdf.setFillColor(48, 79, 105);
  pdf.rect(0, 0, pageWidth, 7, "F");
  pdf.setFillColor(181, 104, 69);
  pdf.rect(0, 7, 52, 2, "F");

  pdf.setTextColor(48, 79, 105);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("CARITAS BOAZ", margin, y);
  y += 10;
  pdf.setTextColor(27, 38, 52);
  pdf.setFontSize(22);
  pdf.text("Aanvraag financiële ondersteuning", margin, y);
  y += 8;
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
  y += 11;

  for (const sectie of samenvatting.secties) {
    const regels = sectie.regels.flatMap((regel) => {
      const waarde = regel.waarde || "—";
      const tekst = `${regel.label}: ${waarde}`;
      return pdf.splitTextToSize(tekst, contentWidth - 10) as string[];
    });
    const hasSignature = sectie.titel === "Datum & ondertekening" && samenvatting.handtekening;
    const boxHeight = 10 + regels.length * 5 + (hasSignature ? 18 : 0);
    addPageIfNeeded(boxHeight + 4);

    pdf.setFillColor(245, 248, 250);
    pdf.setDrawColor(220, 226, 231);
    pdf.roundedRect(margin, y, contentWidth, boxHeight, 1.5, 1.5, "FD");
    y += 6;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(48, 79, 105);
    pdf.text(sectie.titel, margin + 5, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(43, 52, 63);

    for (const regel of sectie.regels) {
      const lines = pdf.splitTextToSize(`${regel.label}: ${regel.waarde || "—"}`, contentWidth - 10) as string[];
      pdf.text(lines, margin + 5, y);
      y += lines.length * 5;
    }
    if (hasSignature) {
      try {
        pdf.addImage(samenvatting.handtekening, "PNG", margin + 5, y, 48, 16, undefined, "FAST");
        y += 18;
      } catch {
        pdf.setTextColor(102, 112, 124);
        pdf.text("Handtekening is geplaatst.", margin + 5, y);
        y += 5;
      }
    }
    y += 3;
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
  pdf.save(`caritas-boaz-aanvraag-${new Date().toISOString().slice(0, 10)}.pdf`);
}