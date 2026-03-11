#!/usr/bin/env node

const readline = require('readline');
const accounting = require('./accounting');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

async function viewBalance() {
  console.log(`Current balance: ${accounting.getBalance().toFixed(2)}`);
}

async function creditAccount() {
  const input = await prompt('Enter credit amount: ');
  const result = accounting.credit(input);
  console.log(result.message);
}

async function debitAccount() {
  const input = await prompt('Enter debit amount: ');
  const result = accounting.debit(input);
  console.log(result.message);
}

async function main() {
  accounting.resetBalance();

  let running = true;

  while (running) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choiceInput = await prompt('Enter your choice (1-4): ');
    const choice = parseInt(choiceInput, 10);

    switch (choice) {
      case 1:
        await viewBalance();
        break;
      case 2:
        await creditAccount();
        break;
      case 3:
        await debitAccount();
        break;
      case 4:
        running = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }

  console.log('Exiting the program. Goodbye!');
  rl.close();
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  rl.close();
});
