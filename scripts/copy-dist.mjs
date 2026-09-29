// Kopieert de statische build-output naar dist/ zodat DirectAdmin die map
// direct kan uploaden. De build kan in dist/client of .output/public
// terechtkomen; beide worden ondersteund.
import { cpSync, existsSync, rmSync, mkdirSync } from "node:fs";

const bronnen = ["dist/client", ".output/public"];
const bron = bronnen.find((map) => existsSync(`${map}/index.html`));

if (!bron) {
  console.error("Geen statische build-output gevonden in:", bronnen.join(", "));
  process.exit(1);
}

if (bron === "dist/client") {
  // Alles uit dist/client een niveau omhoog naar dist/ verplaatsen.
  rmSync("dist/.staging", { recursive: true, force: true });
  cpSync(bron, "dist/.staging", { recursive: true });
  rmSync(bron, { recursive: true, force: true });
  cpSync("dist/.staging", "dist", { recursive: true });
  rmSync("dist/.staging", { recursive: true, force: true });
} else {
  rmSync("dist", { recursive: true, force: true });
  mkdirSync("dist", { recursive: true });
  cpSync(bron, "dist", { recursive: true });
}

console.log(`Statische site gekopieerd van ${bron} naar dist/`);
