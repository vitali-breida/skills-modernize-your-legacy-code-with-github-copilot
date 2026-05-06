const {
  formatBalance,
  resetBalance,
  getBalance,
  viewBalance,
  creditAmount,
  debitAmount,
  isExitChoice,
  getOperationFromChoice,
  dataProgram,
} = require('./index');

describe('Accounting App Business Logic', () => {
  beforeEach(() => {
    resetBalance(1000.0);
  });

  test('TC-01: View initial account balance', () => {
    expect(getBalance()).toBe(1000.0);
    expect(viewBalance()).toBe('001000.00');
  });

  test('TC-02: Credit account increases balance', () => {
    const newBalance = creditAmount(100.0);
    expect(newBalance).toBe(1100.0);
    expect(getBalance()).toBe(1100.0);
    expect(viewBalance()).toBe('001100.00');
  });

  test('TC-03: Debit account decreases balance when funds are sufficient', () => {
    const newBalance = debitAmount(100.0);
    expect(newBalance).toBe(900.0);
    expect(getBalance()).toBe(900.0);
    expect(viewBalance()).toBe('000900.00');
  });

  test('TC-04: Debit account blocked when funds are insufficient', () => {
    expect(() => debitAmount(1500.0)).toThrow('Insufficient funds');
    expect(getBalance()).toBe(1000.0);
  });

  test('TC-05: Invalid menu choice prompts retry', () => {
    expect(getOperationFromChoice('5')).toBeNull();
    expect(getOperationFromChoice('0')).toBeNull();
    expect(getOperationFromChoice('A')).toBeNull();
  });

  test('TC-06: Exit option terminates the application cleanly', () => {
    expect(isExitChoice('4')).toBe(true);
    expect(isExitChoice('1')).toBe(false);
  });

  test('TC-07: Balance persistence within runtime after multiple operations', () => {
    creditAmount(200.0);
    debitAmount(100.0);
    expect(getBalance()).toBe(1100.0);
    expect(viewBalance()).toBe('001100.00');
  });

  test('TC-08: Separate call flow between modules works correctly', () => {
    expect(dataProgram('READ').balance).toBe(1000.0);
    dataProgram('WRITE', 1200.0);
    expect(dataProgram('READ').balance).toBe(1200.0);
  });
});
