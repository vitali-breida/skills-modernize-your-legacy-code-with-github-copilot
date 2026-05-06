# COBOL App Test Plan

This test plan validates the current COBOL student account management application. It covers all business logic and implementation behavior for balance inquiry, credit, debit, and menu handling.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|--------------------|----------|
| TC-01 | View initial account balance | Application is running; initial balance is `1000.00` | 1. Start the application
2. Select option `1` for View Balance | The application displays the current balance as `001000.00` (or equivalent formatted value) |  |  |  |  |
| TC-02 | Credit account increases balance | Application is running; initial balance is `1000.00` | 1. Start the application
2. Select option `2` for Credit Account
3. Enter credit amount `100.00` | The application updates balance and displays new balance as `001100.00` |  |  |  |  |
| TC-03 | Debit account decreases balance when funds are sufficient | Application is running; current balance is `1000.00` | 1. Start the application
2. Select option `3` for Debit Account
3. Enter debit amount `100.00` | The application updates balance and displays new balance as `000900.00` |  |  |  |  |
| TC-04 | Debit account blocked when funds are insufficient | Application is running; current balance is less than requested debit amount | 1. Start the application
2. Select option `3` for Debit Account
3. Enter debit amount greater than current balance (for example `1500.00` when balance is `1000.00`) | The application displays an insufficient funds message and does not change the balance |  |  |  |  |
| TC-05 | Invalid menu choice prompts retry | Application is running | 1. Start the application
2. Enter an invalid menu choice such as `5`, `0`, or `A` | The application displays an invalid choice message and allows another attempt |  |  |  |  |
| TC-06 | Exit option terminates the application cleanly | Application is running | 1. Start the application
2. Select option `4` for Exit | The application displays an exit message and stops execution |  |  |  |  |
| TC-07 | Balance persistence within runtime after multiple operations | Application is running; initial balance is `1000.00` | 1. Start the application
2. Select option `2` and credit `200.00`
3. Select option `3` and debit `100.00`
4. Select option `1` to view balance | The application displays the updated balance as `001100.00` after both operations |  |  |  |  |
| TC-08 | Separate call flow between modules works correctly | Application is running | 1. Start the application
2. Select option `1` or `2` or `3` | The application delegates operations through `Operations` to `DataProgram` and displays correct results |  |  |  |  |
