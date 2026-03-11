# Test Plan — COBOL Student Account Management

This test plan validates the current COBOL application logic and business rules as implemented in `src/cobol/main.cob`, `src/cobol/operations.cob`, and `src/cobol/data.cob`.

> ✅ Use this test plan to confirm behavior against business expectations. Fill in **Actual Result** and **Status** (Pass/Fail) when executing each scenario.

---

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|-------------------|----------|
| TC-01 | View current balance | Application is running (fresh start) | 1. Select option `1` (View Balance) 2. Observe output | Displays `Current balance: 1000.00` |  |  |  |
| TC-02 | Credit account with positive amount | Application is running with balance 1000.00 | 1. Select option `2` (Credit Account) 2. Enter amount `250` | Displays `Amount credited. New balance: 1250.00` (balance is updated) |  |  |  |
| TC-03 | Debit account with sufficient funds | Application is running with balance 1250.00 (after TC-02) | 1. Select option `3` (Debit Account) 2. Enter amount `200` | Displays `Amount debited. New balance: 1050.00` (balance is updated) |  |  |  |
| TC-04 | Debit account with insufficient funds | Application is running with balance 1000.00 (reset or after operations) | 1. Select option `3` (Debit Account) 2. Enter amount `1500` | Displays `Insufficient funds for this debit.` (balance unchanged) |  |  |  |
| TC-05 | Invalid menu selection | Application is running | 1. Enter invalid menu choice (e.g., `9`) | Displays `Invalid choice, please select 1-4.` and re-displays menu |  |  |  |
| TC-06 | Exit the application | Application is running | 1. Select option `4` (Exit) | Program exits cleanly with message `Exiting the program. Goodbye!` |  |  |  |
| TC-07 | Balance resets after restart | Application has been exited and restarted | 1. Start the application 2. Select option `1` (View Balance) | Displays `Current balance: 1000.00` (reset to default) |  |  |  |

---

### Notes
- The application currently maintains the balance only in memory; restarting the program resets to the default `1000.00` balance.
- There is no validation for non-numeric input; invalid input may cause unexpected behavior depending on the COBOL runtime.
