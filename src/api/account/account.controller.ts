import { AccountHistory } from "../../domain/models.js"
import { MemoryStorage } from "../../domain/memory.storage.js"

interface AccountController {
  printStatement(): void
  deposit(amount: number): void
  withdraw(amount: number): void
}

export const getAccountController = (memoryStorage: MemoryStorage<AccountHistory>): AccountController => ({
  deposit: (amount: number) => {
    const accountHistory = memoryStorage.getAllItems()
    const amountOfItems = accountHistory.length

    const lastBalance = amountOfItems > 0 ? accountHistory[amountOfItems - 1].balance : 0
    const newBalance = lastBalance + amount

    memoryStorage.putItem({
      amount,
      balance: newBalance,
      date: new Date().toISOString().split("T")[0],
    })
  },
  withdraw: (amount: number) => {
    const accountHistory = memoryStorage.getAllItems()
    const amountOfItems = accountHistory.length

    const lastBalance = amountOfItems > 0 ? accountHistory[amountOfItems - 1].balance : 0
    const newBalance = lastBalance - amount

    memoryStorage.putItem({
      amount: -amount,
      balance: newBalance,
      date: new Date().toISOString().split("T")[0],
    })
  },
  printStatement: () => {
    console.log("DATE | AMOUNT | BALANCE")

    memoryStorage.getAllItems().map((it) => console.log(`${it.date} | ${it.amount} | ${it.balance}`))
  },
})
