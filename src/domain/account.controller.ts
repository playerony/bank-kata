export interface AccountController {
  printStatement(): void
  deposit(amount: number): void
  withdraw(amount: number): void
}
