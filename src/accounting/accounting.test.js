const accounting = require('./accounting');

describe('Accounting module (COBOL business logic)', () => {
  beforeEach(() => {
    accounting.resetBalance();
  });

  test('TC-01 View current balance (initial)', () => {
    expect(accounting.getBalance()).toBeCloseTo(1000.0);
  });

  test('TC-02 Credit account with positive amount', () => {
    const result = accounting.credit(250);
    expect(result.balance).toBeCloseTo(1250.0);
    expect(result.message).toBe('Amount credited. New balance: 1250.00');
    expect(accounting.getBalance()).toBeCloseTo(1250.0);
  });

  test('TC-03 Debit account with sufficient funds', () => {
    accounting.credit(250);
    const result = accounting.debit(200);
    expect(result.balance).toBeCloseTo(1050.0);
    expect(result.message).toBe('Amount debited. New balance: 1050.00');
    expect(accounting.getBalance()).toBeCloseTo(1050.0);
  });

  test('TC-04 Debit account with insufficient funds', () => {
    const result = accounting.debit(1500);
    expect(result.balance).toBeCloseTo(1000.0);
    expect(result.message).toBe('Insufficient funds for this debit.');
    expect(accounting.getBalance()).toBeCloseTo(1000.0);
  });

  test('TC-05 Invalid input is treated as 0 for credit and debit', () => {
    const creditResult = accounting.credit('not-a-number');
    expect(creditResult.balance).toBeCloseTo(1000.0);
    expect(creditResult.message).toBe('Amount credited. New balance: 1000.00');

    const debitResult = accounting.debit('not-a-number');
    expect(debitResult.balance).toBeCloseTo(1000.0);
    expect(debitResult.message).toBe('Amount debited. New balance: 1000.00');
  });

  test('TC-07 Balance resets after resetBalance() (simulating restart)', () => {
    accounting.credit(500);
    expect(accounting.getBalance()).toBeCloseTo(1500.0);
    accounting.resetBalance();
    expect(accounting.getBalance()).toBeCloseTo(1000.0);
  });
});
