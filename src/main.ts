import { AccountHistory } from "./domain/models.js"
import { getMemoryStorage } from "./source/index.js"
import { getAccountController } from "./api/index.js"

const memoryStorage = getMemoryStorage<AccountHistory>()
const accountController = getAccountController(memoryStorage)

export function myFunction() {
  accountController.deposit(100)
  accountController.withdraw(50)
  accountController.deposit(100)
  accountController.withdraw(50)
  accountController.printStatement()
}
