export interface MemoryStorage<DataType> {
  getAllItems: () => DataType[]
  putItem: (item: DataType) => void
}
