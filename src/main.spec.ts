import { describe, it, expect, vi } from "vitest"
import { myFunction } from "./main.js"

vi.useFakeTimers()
vi.setSystemTime(new Date(2020, 3, 1))

describe("Default test", () => {
  it("should work", () => {
    const consoleLogMock = vi.fn()
    console.log = consoleLogMock

    myFunction()

    expect(consoleLogMock).toHaveBeenCalledTimes(5)
    expect(consoleLogMock).toHaveBeenNthCalledWith(1, "DATE | AMOUNT | BALANCE")
    expect(consoleLogMock).toHaveBeenNthCalledWith(2, "2020-03-31 | 100 | 100")
    expect(consoleLogMock).toHaveBeenNthCalledWith(3, "2020-03-31 | -50 | 50")
    expect(consoleLogMock).toHaveBeenNthCalledWith(4, "2020-03-31 | 100 | 150")
    expect(consoleLogMock).toHaveBeenNthCalledWith(5, "2020-03-31 | -50 | 100")
  })
})
