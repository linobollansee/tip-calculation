// readline-Modul laden (für Konsoleneingaben)
const r = require("readline");

// Interface erstellen für Input/Output
const rl = r.createInterface({ input: process.stdin, output: process.stdout });

// Hilfsfunktion 'a' (ask) für schnelle Eingaben, Inline-Promise für Kürze
const a = (q: string) => new Promise<string>((res) => rl.question(q, res));

(async () => {
  // c = check, t = tip %, s = split yes/no, p = people → kurze Variablen für Codegolf
  const c = parseFloat(await a("How high is the check? (e.g., 50.00) "));
  const t = parseFloat(
    await a("What percentage of tip will you give? (e.g., 15) ")
  );
  const s =
    (
      await a("Should the bill be split among multiple people? (yes/no) ")
    ).toLowerCase() == "yes";
  const p = s ? parseInt(await a("How many people will split the bill? ")) : 1;

  // Linie für die Ausgabe dynamisch erzeugt statt literal -----------------------------
  const l = "-".repeat(29);

  // Alle Berechnungen inline im Template-String → keine extra Variablen für tip, total, per
  // Ternary-Operator für Split-Ausgabe → spart if/else
  console.log(`--- Tip Calculation Summary ---
Check Amount: $${c.toFixed(2)}
Tip Percentage: ${t}%
Tip Amount: $${((c * t) / 100).toFixed(2)}
Total Bill: $${(c + (c * t) / 100).toFixed(2)}
Divide among people: ${s ? "yes" : "no"}
${
  s
    ? `Split between how many people: ${p}\nEach person pays: $${(
        (c + (c * t) / 100) /
        p
      ).toFixed(2)}`
    : ""
}
${l}`);

  // readline schließen, kompakt am Ende
  rl.close();
})();
