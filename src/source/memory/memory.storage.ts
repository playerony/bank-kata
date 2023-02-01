import { MemoryStorage } from "../../domain/memory.storage.js"

export const getMemoryStorage = <DataType>(): MemoryStorage<DataType> => {
  const arrayStorage: DataType[] = []

  return {
    getAllItems: () => arrayStorage,
    putItem: (item: DataType) => arrayStorage.push(item),
  }
}
