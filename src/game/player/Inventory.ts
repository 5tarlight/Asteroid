import Item from "../item/Item";
import InventoryOutofBoundError from "../../error/InventoryOutofBoundError";

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
      throw new InventoryOutofBoundError('')
    }
    return this.items[index]
  }

  add(item: Item) {
    this.items.push(item)
  }
}

export default Inventory
