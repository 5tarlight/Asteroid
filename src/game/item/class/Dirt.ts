import Item, { ItemInfo } from "../Item";
import TradableItem from "../TradableItem";

class Dirt implements Item, TradableItem {
  price: number = 1;
  sellRate: number = 1;

  public info: ItemInfo = {
    name: '흙',
    count: 1,
    meta: 0,
    exp: 0
  }
}

export default Dirt
