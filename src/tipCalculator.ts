// tipCalculator.ts
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("--- Tip Calculator ---");

  let checkAmount: number;
  while (true) {
    const input = await askQuestion("How high is the check? (e.g., 50.00): ");
    checkAmount = parseFloat(input);
    if (!isNaN(checkAmount) && checkAmount >= 0) break;
    console.log("Please enter a valid positive number for the check amount.");
  }

  let tipPercentage: number;
  while (true) {
    const input = await askQuestion(
      "What percentage of tip will you give? (e.g., 15): "
    );
    tipPercentage = parseFloat(input);
    if (!isNaN(tipPercentage) && tipPercentage >= 0) break;
    console.log(
      "Please enter a valid non-negative number for the tip percentage."
    );
  }

  let split: boolean;
  while (true) {
    const input = await askQuestion(
      "Should the bill be split among multiple people? (yes/no): "
    );
    if (input.toLowerCase() === "yes") {
      split = true;
      break;
    } else if (input.toLowerCase() === "no") {
      split = false;
      break;
    } else {
      console.log('Please answer "yes" or "no".');
    }
  }

  let numPeople = 1;
  if (split) {
    while (true) {
      const input = await askQuestion("How many people will split the bill? ");
      numPeople = parseInt(input);
      if (!isNaN(numPeople) && numPeople > 0) break;
      console.log(
        "Please enter a valid positive integer for number of people."
      );
    }
  }

  const tipAmount = (checkAmount * tipPercentage) / 100;
  const totalBill = checkAmount + tipAmount;
  const amountPerPerson = totalBill / numPeople;

  console.log("\n--- Tip Calculation Summary ---");
  console.log(`Check Amount: $${checkAmount.toFixed(2)}`);
  console.log(`Tip Percentage: ${tipPercentage}%`);
  console.log(`Tip Amount: $${tipAmount.toFixed(2)}`);
  console.log(`Total Bill: $${totalBill.toFixed(2)}`);
  console.log(`Divide among people: ${split ? "yes" : "no"}`);
  if (split) {
    console.log(`Split between how many people: ${numPeople}`);
    console.log(`Each person pays: $${amountPerPerson.toFixed(2)}`);
  }
  console.log("-----------------------------");

  rl.close();
}

main();
