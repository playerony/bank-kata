import { AccountHistory } from "../../domain/models.js"
import { MemoryStorage } from "../../domain/memory.storage.js"
import { AccountController } from "../../domain/account.controller.js"
import { getCurrentUTCDate } from "../../utils/index.js"

export const getAccountController = (memoryStorage: MemoryStorage<AccountHistory>): AccountController => ({
  deposit: (amount: number) => {
    const accountHistory = memoryStorage.getAllItems()
    const amountOfItems = accountHistory.length

    const lastBalance = amountOfItems > 0 ? accountHistory[amountOfItems - 1].balance : 0
    const newBalance = lastBalance + amount

    memoryStorage.putItem({
      amount,
      balance: newBalance,
      date: getCurrentUTCDate(),
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
      date: getCurrentUTCDate(),
    })
  },
  printStatement: () => {
    console.log("DATE | AMOUNT | BALANCE")

    memoryStorage.getAllItems().map((it) => console.log(`${it.date} | ${it.amount} | ${it.balance}`))
  },
})
