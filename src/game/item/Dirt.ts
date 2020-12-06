import Item, { ItemInfo } from "./Item";

class Dirt implements Item {
  public info: ItemInfo = {
    name: '흙',
    count: 1,
    meta: 0,
    exp: 0
  }
}

export default Dirt
