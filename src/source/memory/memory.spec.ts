import { getMemoryStorage } from "./memory.storage.js"
import { describe, it, expect, vi } from "vitest"

describe("getMemoryStorage function", () => {
  it("should be defined", () => {
    expect(getMemoryStorage).toBeDefined()
  })

  it("should return proper object", () => {
    const memoryStorage = getMemoryStorage()

    expect(memoryStorage).toEqual({
      putItem: expect.any(Function),
      getAllItems: expect.any(Function),
    })
  })

  describe("putItem function", () => {
    it("should be defined", () => {
      const memoryStorage = getMemoryStorage()

      expect(memoryStorage.putItem).toBeDefined()
    })

    it("should add item to storage", () => {
      const memoryStorage = getMemoryStorage()

      memoryStorage.putItem("test")

      expect(memoryStorage.getAllItems()).toEqual(["test"])
    })
  })

  describe("getAllItems function", () => {
    it("should return empty array by default", () => {
      const memoryStorage = getMemoryStorage()

      expect(memoryStorage.getAllItems()).toEqual([])
    })

    it("should return all items", () => {
      const memoryStorage = getMemoryStorage()

      memoryStorage.putItem("test1")
      memoryStorage.putItem("test2")

      expect(memoryStorage.getAllItems()).toEqual(["test1", "test2"])
    })
  })
})
