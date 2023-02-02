export const getCurrentUTCDate = () => {
  const date = new Date()
  const year = date.getUTCFullYear()
  const day = date.getUTCDate().toString().padStart(2, "0")
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")

  return `${year}-${month}-${day}`
}
