# COBOL Student Account Management (docs)

This `docs/README.md` explains the purpose of each COBOL source file in this repo, highlights key functions / program logic, and outlines the business rules related to student account balances.

---

## 📁 Source File Overview

### `src/cobol/main.cob`
**Purpose:**
- Acts as the user-facing entry point for the application.
- Presents a console menu for interacting with a single student account.

**Key behavior:**
- Displays options: View Balance, Credit Account, Debit Account, Exit.
- Reads user choice and dispatches work by calling `Operations` with a specific operation code.
- Loops until the user selects “Exit”.

### `src/cobol/operations.cob`
**Purpose:**
- Implements the core account operations (view, credit, debit) by coordinating between the UI and data storage.

**Key behavior:**
- Receives an operation type from `MainProgram` (`TOTAL`, `CREDIT`, `DEBIT`).
- For each operation:
  - **TOTAL:** Reads current balance from `DataProgram` and displays it.
  - **CREDIT:** Prompts for an amount, reads current balance, adds amount, writes updated balance, displays new balance.
  - **DEBIT:** Prompts for an amount, reads current balance, checks sufficient funds, subtracts amount and writes updated balance, or displays an error if funds are insufficient.

### `src/cobol/data.cob`
**Purpose:**
- Acts as a simple in-memory storage layer for the account balance.
- Provides two operations: `READ` (return current balance) and `WRITE` (update balance).

**Key behavior:**
- Keeps the balance in a `WORKING-STORAGE` variable (`STORAGE-BALANCE`).
- When called with `READ`, copies storage into the caller’s `BALANCE`.
- When called with `WRITE`, updates internal storage from the caller’s `BALANCE`.

---

## 🧠 Student Account Business Rules

1. **Single Account Context**
   - The program manages a single student account balance in memory.
   - There is no concept of multiple students, accounts, or authentication.

2. **Initial Balance**
   - The account starts with a default balance of **1000.00**.
   - This initial value is stored in `DataProgram`’s `STORAGE-BALANCE`.

3. **View Balance**
   - The "View Balance" operation reads the current in-memory balance and displays it.

4. **Credit (Deposit)**
   - The student can credit a positive amount to the account.
   - The amount is added to the current balance and immediately written back to storage.

5. **Debit (Withdrawal)**
   - The student can debit (withdraw) a positive amount from the account.
   - The program checks: `balance >= amount` before allowing the debit.
   - If funds are insufficient, it displays: `Insufficient funds for this debit.` and does not change the balance.

6. **Persistence**
   - The balance is stored only in memory while the program is running.
   - When the program exits, the balance resets to `1000.00` on the next run.

---

## 🧩 Notes / Next Steps (Optional Enhancements)

If you want to modernize this legacy code further, possible next steps include:
- Adding persistence (file or DB) so balances survive program restarts.
- Supporting multiple student accounts and selecting which account to operate on.
- Adding input validation (e.g., preventing negative amounts, handling non-numeric input).
- Introducing a simple login mechanism to associate balances with student IDs.

---

*Generated for the purposes of documenting the COBOL account management example.*
