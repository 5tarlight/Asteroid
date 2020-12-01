import Item, { ItemInfo } from "./Item";

class Stone implements Item {
  info: ItemInfo = {
    name: '돌',
    meta: 0,
    count: 1
  }
}

export default Stone
