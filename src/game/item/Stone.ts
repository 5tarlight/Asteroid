import Item, { ItemInfo } from "./Item";
import TradableItem from "./TradableItem";

class Stone implements Item, TradableItem {
  price: number = 2;
  sellRate: number = 1;

  info: ItemInfo = {
    name: '돌',
    meta: 0,
    count: 1,
    exp: 1
  }
}

export default Stone
