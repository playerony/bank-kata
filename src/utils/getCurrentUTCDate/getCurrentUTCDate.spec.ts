import { getCurrentUTCDate } from "./getCurrentUTCDate.js"
import { describe, it, expect, vi } from "vitest"

describe("getCurrentUTCDate function", () => {
  it("should be defined", () => {
    expect(getCurrentUTCDate).toBeDefined()
  })

  it("should return proper date", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2020, 3, 1))

    expect(getCurrentUTCDate()).toEqual("2020-03-31")
  })
})
