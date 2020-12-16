import Item from "../item/Item";
import InventoryOutOfBoundError from "../../error/InventoryOutOfBoundError";

class Inventory {
  public items: Item[]

  constructor() {
    this.items = []
  }

  constructer(items: Item[]) {
    this.items = items
  }

  get(index: number) {
    if (index < 0 || index >= this.items.length) {
      throw new InventoryOutOfBoundError('')
    }
    return this.items[index]
  }

  add(item: Item) {
    this.items.push(item)
  }
}

export default Inventory
