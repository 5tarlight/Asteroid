import Item, { ItemInfo } from "./Item";

class IronOre implements Item {
  info: ItemInfo = {
    name: '철 광석',
    meta: 0,
    count: 1,
    exp: 5
  }
}

export default IronOre
