// tipCalculator.ts

// Wir importieren das Modul "readline"
// Dieses Modul ermöglicht es uns, Eingaben vom Benutzer über die Konsole zu lesen
// und auch Ausgaben in der Konsole anzuzeigen.
const readline = require("readline");

// Wir erstellen ein "Interface" für die Eingabe (input) und Ausgabe (output)
// Das Interface verbindet die Tastatur (stdin) mit dem Programm
// und zeigt Text auf der Konsole an (stdout).
const rl = readline.createInterface({
  input: process.stdin, // Die Standard-Eingabe (meist Tastatur)
  output: process.stdout, // Die Standard-Ausgabe (meist Bildschirm)
});

// Diese Funktion stellt eine Frage an den Benutzer und wartet auf eine Antwort
// "question" ist der Text, der dem Benutzer angezeigt wird
// Wir nutzen "Promise", damit wir später die Antwort mit "await" abwarten können
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
  // rl.question zeigt die Frage an und ruft "resolve" auf, wenn der Benutzer etwas eingibt
}

// Die Hauptfunktion, die den gesamten Ablauf des Tip Calculators steuert
async function main() {
  // Begrüßung in der Konsole
  console.log("--- Tip Calculator ---");

  let checkAmount: number; // Variable für den Rechnungsbetrag

  // Endlosschleife: Wir wiederholen die Abfrage solange, bis der Benutzer eine gültige Zahl eingibt
  while (true) {
    // askQuestion zeigt die Frage in der Konsole an und wartet auf Eingabe
    const input = await askQuestion("How high is the check? (e.g., 50.00): ");
    // parseFloat wandelt die Eingabe (String) in eine Gleitkommazahl um
    checkAmount = parseFloat(input);

    // Prüfen, ob die Eingabe eine gültige Zahl ist UND größer oder gleich 0
    if (!isNaN(checkAmount) && checkAmount >= 0) break;

    // Falls die Eingabe ungültig ist, wird diese Nachricht angezeigt
    console.log("Please enter a valid positive number for the check amount.");
  }

  let tipPercentage: number; // Variable für den Trinkgeldprozentsatz

  // Endlosschleife für die Eingabe des Trinkgeldprozentsatzes
  while (true) {
    const input = await askQuestion(
      "What percentage of tip will you give? (e.g., 15): "
    );
    // Eingabe in Zahl umwandeln
    tipPercentage = parseFloat(input);

    // Prüfen, ob die Zahl gültig und nicht negativ ist
    if (!isNaN(tipPercentage) && tipPercentage >= 0) break;

    // Fehlermeldung, falls Eingabe ungültig
    console.log(
      "Please enter a valid non-negative number for the tip percentage."
    );
  }

  let split: boolean; // Variable, ob die Rechnung geteilt werden soll (ja/nein)

  // Endlosschleife, um die Entscheidung zu treffen
  while (true) {
    const input = await askQuestion(
      "Should the bill be split among multiple people? (yes/no): "
    );
    // toLowerCase wandelt die Eingabe in Kleinbuchstaben um, damit "Yes", "YES" etc. funktionieren
    if (input.toLowerCase() === "yes") {
      split = true; // Rechnung wird geteilt
      break; // Schleife beenden
    } else if (input.toLowerCase() === "no") {
      split = false; // Rechnung wird nicht geteilt
      break; // Schleife beenden
    } else {
      // Falls die Eingabe weder "yes" noch "no" ist, Fehlermeldung
      console.log('Please answer "yes" or "no".');
    }
  }

  let numPeople = 1; // Standardwert: 1 Person, falls nicht geteilt wird

  // Falls die Rechnung geteilt werden soll
  if (split) {
    while (true) {
      const input = await askQuestion("How many people will split the bill? ");
      // parseInt wandelt die Eingabe in eine ganze Zahl um
      numPeople = parseInt(input);

      // Prüfen, ob es eine gültige positive ganze Zahl ist
      if (!isNaN(numPeople) && numPeople > 0) break;

      // Fehlermeldung, falls ungültig
      console.log(
        "Please enter a valid positive integer for number of people."
      );
    }
  }

  // Berechnung des Trinkgeldbetrags
  const tipAmount = (checkAmount * tipPercentage) / 100;
  // Berechnung der Gesamtrechnung inklusive Trinkgeld
  const totalBill = checkAmount + tipAmount;
  // Berechnung, wie viel jede Person zahlen muss (falls geteilt wird)
  const amountPerPerson = totalBill / numPeople;

  // Ausgabe der Zusammenfassung
  console.log("\n--- Tip Calculation Summary ---");
  console.log(`Check Amount: $${checkAmount.toFixed(2)}`); // Rechnungsbetrag mit 2 Nachkommastellen
  console.log(`Tip Percentage: ${tipPercentage}%`); // Trinkgeldprozentsatz
  console.log(`Tip Amount: $${tipAmount.toFixed(2)}`); // Trinkgeldbetrag
  console.log(`Total Bill: $${totalBill.toFixed(2)}`); // Gesamtrechnung
  console.log(`Divide among people: ${split ? "yes" : "no"}`); // Anzeige ob geteilt

  if (split) {
    console.log(`Split between how many people: ${numPeople}`); // Anzahl der Personen
    console.log(`Each person pays: $${amountPerPerson.toFixed(2)}`); // Betrag pro Person
  }

  console.log("-----------------------------");

  // readline-Interface schließen, damit das Programm beendet wird
  rl.close();
}

// Aufruf der Hauptfunktion
main();
