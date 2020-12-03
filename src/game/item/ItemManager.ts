import Dirt from "./Dirt";
import Stone from "./Stone";
import Item from "./Item";
import { Items } from "../../util/Database";
import { Op } from "sequelize";
import Logger from "../../Logger";

class ItemManager {
  static items = {
    dirt: new Dirt(),
    stone: new Stone()
  }

  public static init() {
    Object.values(this.items).forEach(async (item, i) => {
      const key = Object.keys(this.items)[i]
      const tems = await Items.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.eq]: key } },
            { name_ko: { [Op.eq]: item.info.name } }
          ]
        }
      })

      if (tems.length == 0) {
        Items.create({
          name: key,
          name_ko: item.info.name
        })

        Logger.info(`New item added: ${key}`)
      }
    })
  }

  public static getItem(name: string): Item | null {
    if (this.items[name]) return this.items[name]

    const names = Object.values(this.items).map(i => i.info.name)
    if (!names.includes(name)) return null
    else return Object.values(this.items).filter(i => i.info.name == name)[0]
  }
}

export default ItemManager
