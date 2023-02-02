import { MemoryStorage } from "../../domain/memory.storage.js"
import { getAccountController } from "./account.controller.js"
import { describe, it, expect, vi } from "vitest"
import { AccountHistory } from "../../domain/models.js"
import { getMemoryStorage } from "../../source/index.js"
import { getCurrentUTCDate } from "../../utils/index.js"

const getBaseMemoryStorageMock = (): MemoryStorage<AccountHistory> => ({
  putItem: vi.fn(),
  getAllItems: vi.fn().mockReturnValue([]),
})

vi.useFakeTimers()
vi.setSystemTime(new Date(2020, 3, 1))

describe("getAccountController function", () => {
  it("should be defined", () => {
    expect(getAccountController).toBeDefined()
  })

  it("should return proper object", () => {
    const memoryStorage = getBaseMemoryStorageMock()
    const accountController = getAccountController(memoryStorage)

    expect(accountController).toEqual({
      deposit: expect.any(Function),
      withdraw: expect.any(Function),
      printStatement: expect.any(Function),
    })
  })

  describe("printStatement function", () => {
    it("should display only a header for empty table", () => {
      const memoryStorage = getBaseMemoryStorageMock()
      const accountController = getAccountController(memoryStorage)

      const consoleLogMock = vi.fn()
      console.log = consoleLogMock

      accountController.printStatement()

      expect(consoleLogMock).toHaveBeenCalledOnce()
      expect(consoleLogMock).toHaveBeenCalledWith("DATE | AMOUNT | BALANCE")
    })

    it("should display a header and a single row for a table with one item", () => {
      const getMemoryStorageMock = (): MemoryStorage<AccountHistory> => ({
        putItem: vi.fn(),
        getAllItems: vi.fn().mockReturnValue([
          {
            amount: 100,
            balance: 100,
            date: "2021-01-01",
          },
        ] as AccountHistory[]),
      })

      const memoryStorage = getMemoryStorageMock()
      const accountController = getAccountController(memoryStorage)

      const consoleLogMock = vi.fn()
      console.log = consoleLogMock

      accountController.printStatement()

      expect(consoleLogMock).toHaveBeenCalledTimes(2)
      expect(consoleLogMock).toHaveBeenCalledWith("DATE | AMOUNT | BALANCE")
      expect(consoleLogMock).toHaveBeenCalledWith("2021-01-01 | 100 | 100")
    })

    it("should display a header and multiple rows for a table with multiple items", () => {
      const getMemoryStorageMock = (): MemoryStorage<AccountHistory> => ({
        putItem: vi.fn(),
        getAllItems: vi.fn().mockReturnValue([
          {
            amount: 100,
            balance: 100,
            date: "2021-01-01",
          },
          {
            amount: 200,
            balance: 300,
            date: "2021-01-02",
          },
          {
            amount: 300,
            balance: 600,
            date: "2021-01-03",
          },
        ] as AccountHistory[]),
      })

      const memoryStorage = getMemoryStorageMock()
      const accountController = getAccountController(memoryStorage)

      const consoleLogMock = vi.fn()
      console.log = consoleLogMock

      accountController.printStatement()

      expect(consoleLogMock).toHaveBeenCalledTimes(4)
      expect(consoleLogMock).toHaveBeenCalledWith("DATE | AMOUNT | BALANCE")
      expect(consoleLogMock).toHaveBeenCalledWith("2021-01-01 | 100 | 100")
      expect(consoleLogMock).toHaveBeenCalledWith("2021-01-02 | 200 | 300")
      expect(consoleLogMock).toHaveBeenCalledWith("2021-01-03 | 300 | 600")
    })
  })

  describe("deposit function", () => {
    it("should call putItem function with proper object", () => {
      const memoryStorage = getBaseMemoryStorageMock()
      const accountController = getAccountController(memoryStorage)

      accountController.deposit(100)

      expect(memoryStorage.putItem).toHaveBeenCalledOnce()
      expect(memoryStorage.putItem).toHaveBeenCalledWith({
        amount: 100,
        balance: 100,
        date: getCurrentUTCDate(),
      })
    })

    it("should call putItem function with proper object when there are already some items in the storage", () => {
      const getMemoryStorageMock = (): MemoryStorage<AccountHistory> => ({
        putItem: vi.fn(),
        getAllItems: vi.fn().mockReturnValue([
          {
            amount: 100,
            balance: 100,
            date: "2021-01-01",
          },
        ] as AccountHistory[]),
      })

      const memoryStorage = getMemoryStorageMock()
      const accountController = getAccountController(memoryStorage)

      accountController.deposit(200)

      expect(memoryStorage.putItem).toHaveBeenCalledOnce()
      expect(memoryStorage.putItem).toHaveBeenCalledWith({
        amount: 200,
        balance: 300,
        date: getCurrentUTCDate(),
      })
    })

    it("should add to the storage object with well formatted date", () => {
      const memoryStorage = getMemoryStorage<AccountHistory>()
      const accountController = getAccountController(memoryStorage)

      const consoleLogMock = vi.fn()
      console.log = consoleLogMock

      accountController.deposit(100)
      accountController.deposit(300)

      accountController.printStatement()

      expect(consoleLogMock).toHaveBeenCalledTimes(3)
      expect(consoleLogMock).toHaveBeenCalledWith("DATE | AMOUNT | BALANCE")
      expect(consoleLogMock).toHaveBeenCalledWith("2020-03-31 | 100 | 100")
      expect(consoleLogMock).toHaveBeenCalledWith("2020-03-31 | 300 | 400")
    })
  })

  describe("withdraw function", () => {
    it("should call putItem function with proper object", () => {
      const memoryStorage = getBaseMemoryStorageMock()
      const accountController = getAccountController(memoryStorage)

      accountController.withdraw(100)

      expect(memoryStorage.putItem).toHaveBeenCalledOnce()
      expect(memoryStorage.putItem).toHaveBeenCalledWith({
        amount: -100,
        balance: -100,
        date: "2020-03-31",
      })
    })

    it("should call putItem function with proper object when there are already some items in the storage", () => {
      const getMemoryStorageMock = (): MemoryStorage<AccountHistory> => ({
        putItem: vi.fn(),
        getAllItems: vi.fn().mockReturnValue([
          {
            amount: 100,
            balance: 100,
            date: "2020-03-31",
          },
        ] as AccountHistory[]),
      })

      const memoryStorage = getMemoryStorageMock()
      const accountController = getAccountController(memoryStorage)

      accountController.withdraw(200)

      expect(memoryStorage.putItem).toHaveBeenCalledOnce()
      expect(memoryStorage.putItem).toHaveBeenCalledWith({
        amount: -200,
        balance: -100,
        date: "2020-03-31",
      })
    })

    it("should add to the storage object with well formatted date", () => {
      const memoryStorage = getMemoryStorage<AccountHistory>()
      const accountController = getAccountController(memoryStorage)

      const consoleLogMock = vi.fn()
      console.log = consoleLogMock

      accountController.deposit(1000)
      accountController.withdraw(300)

      accountController.printStatement()

      expect(consoleLogMock).toHaveBeenCalledTimes(3)
      expect(consoleLogMock).toHaveBeenNthCalledWith(1, "DATE | AMOUNT | BALANCE")
      expect(consoleLogMock).toHaveBeenNthCalledWith(2, "2020-03-31 | 1000 | 1000")
      expect(consoleLogMock).toHaveBeenNthCalledWith(3, "2020-03-31 | -300 | 700")
    })
  })
})
