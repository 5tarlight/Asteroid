import Item, { ItemInfo } from "./Item";
import TradableItem from "./TradableItem";

class IronOre implements Item, TradableItem {
  price: number = 5;
  sellRate: number = 0.6;

  info: ItemInfo = {
    name: '철 광석',
    meta: 0,
    count: 1,
    exp: 5
  }
}

export default IronOre
