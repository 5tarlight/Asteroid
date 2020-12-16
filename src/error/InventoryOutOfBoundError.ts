class InventoryOutOfBoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InventoryOutOfBoundError"
  }
}

export default InventoryOutOfBoundError
