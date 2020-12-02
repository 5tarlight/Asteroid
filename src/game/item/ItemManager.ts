import Dirt from "./Dirt";
import Stone from "./Stone";
import Item from "./Item";

class ItemManager {
  static items = {
    dirt: new Dirt(),
    stone: new Stone()
  }

  public static getItem(name: string): Item | null {
    if (this.items[name]) return this.items[name]

    const names = Object.values(this.items).map(i => i.info.name)
    if (!names.includes(name)) return null
    else return Object.values(this.items).filter(i => i.info.name == name)[0]
  }
}

export default ItemManager
