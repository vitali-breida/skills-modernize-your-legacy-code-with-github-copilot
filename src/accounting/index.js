#!/usr/bin/env node

const readline = require('readline');

let storedBalance = 1000.0;
let rl = null;

const getReadline = () => {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  return rl;
};

const formatBalance = (value) => {
  const fixed = value.toFixed(2);
  const [integer, decimals] = fixed.split('.');
  return `${integer.padStart(6, '0')}.${decimals}`;
};

const ask = (prompt) => new Promise((resolve) => {
  getReadline().question(prompt, (answer) => resolve(answer));
});

const dataProgram = (operation, balance) => {
  if (operation === 'READ') {
    return { balance: storedBalance };
  }

  if (operation === 'WRITE') {
    storedBalance = balance;
    return { balance: storedBalance };
  }

  throw new Error(`Unknown data operation: ${operation}`);
};

const resetBalance = (value = 1000.0) => {
  storedBalance = value;
};

const getBalance = () => dataProgram('READ').balance;

const viewBalance = () => formatBalance(getBalance());

const creditAmount = (amount) => {
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
    throw new Error('Invalid credit amount');
  }

  const current = getBalance();
  const newBalance = current + amount;
  dataProgram('WRITE', newBalance);
  return newBalance;
};

const debitAmount = (amount) => {
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
    throw new Error('Invalid debit amount');
  }

  const current = getBalance();
  if (current < amount) {
    throw new Error('Insufficient funds');
  }

  const newBalance = current - amount;
  dataProgram('WRITE', newBalance);
  return newBalance;
};

const isExitChoice = (choice) => String(choice).trim() === '4';

const getOperationFromChoice = (choice) => {
  switch (String(choice).trim()) {
    case '1':
      return 'TOTAL';
    case '2':
      return 'CREDIT';
    case '3':
      return 'DEBIT';
    default:
      return null;
  }
};

const performOperation = async (operationType) => {
  if (operationType === 'TOTAL') {
    const result = dataProgram('READ');
    console.log(`Current balance: ${formatBalance(result.balance)}`);
    return;
  }

  if (operationType === 'CREDIT') {
    const amountText = await ask('Enter credit amount: ');
    const amount = parseFloat(amountText);

    if (Number.isNaN(amount) || amount < 0) {
      console.log('Invalid credit amount.');
      return;
    }

    const result = dataProgram('READ');
    const newBalance = result.balance + amount;
    dataProgram('WRITE', newBalance);
    console.log(`Amount credited. New balance: ${formatBalance(newBalance)}`);
    return;
  }

  if (operationType === 'DEBIT') {
    const amountText = await ask('Enter debit amount: ');
    const amount = parseFloat(amountText);

    if (Number.isNaN(amount) || amount < 0) {
      console.log('Invalid debit amount.');
      return;
    }

    const result = dataProgram('READ');

    if (result.balance >= amount) {
      const newBalance = result.balance - amount;
      dataProgram('WRITE', newBalance);
      console.log(`Amount debited. New balance: ${formatBalance(newBalance)}`);
      return;
    }

    console.log('Insufficient funds for this debit.');
    return;
  }

  console.log('Invalid operation type.');
};

const main = async () => {
  let continueFlag = true;

  while (continueFlag) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = await ask('Enter your choice (1-4): ');

    switch (choice.trim()) {
      case '1':
        await performOperation('TOTAL');
        break;
      case '2':
        await performOperation('CREDIT');
        break;
      case '3':
        await performOperation('DEBIT');
        break;
      case '4':
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
        break;
    }
  }

  console.log('Exiting the program. Goodbye!');
  if (rl) {
    rl.close();
  }
};

module.exports = {
  formatBalance,
  dataProgram,
  resetBalance,
  getBalance,
  viewBalance,
  creditAmount,
  debitAmount,
  isExitChoice,
  getOperationFromChoice,
  performOperation,
};

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    rl.close();
    process.exit(1);
  });
}
