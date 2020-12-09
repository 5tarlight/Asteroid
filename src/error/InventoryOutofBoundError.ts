class InventoryOutofBoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidEnvError"
  }
}

export default InventoryOutofBoundError
