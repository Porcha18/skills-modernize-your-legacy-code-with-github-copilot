let balance = 1000.0;

function resetBalance() {
  balance = 1000.0;
}

function getBalance() {
  return balance;
}

function credit(amount) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  const validAmount = Number.isFinite(num) ? num : 0;
  balance += validAmount;
  return { balance, message: `Amount credited. New balance: ${balance.toFixed(2)}` };
}

function debit(amount) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  const validAmount = Number.isFinite(num) ? num : 0;

  if (balance >= validAmount) {
    balance -= validAmount;
    return { balance, message: `Amount debited. New balance: ${balance.toFixed(2)}` };
  }

  return { balance, message: 'Insufficient funds for this debit.' };
}

module.exports = {
  resetBalance,
  getBalance,
  credit,
  debit,
};
