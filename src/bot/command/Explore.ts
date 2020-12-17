import {Message, MessageEmbed} from "discord.js";
import Asteroid from "../Asteroid";
import CommandExecutor, {CommandInfo} from "./CommandExecutor";
import config from "../../configure";
import PlanetManager from "../../game/universe/PlanetManager";
import Minable from "../../game/universe/Minable";
import Item from "../../game/item/Item";
import ItemManager from "../../game/item/ItemManager";
import Logger from "../../Logger";
import {Inventory} from "../../util/Database";
import delay from "../../util/delay";

class Explore implements CommandExecutor {
  info: CommandInfo = {
    name: 'explore',
    desc: '해당 지역을 탐험합니다.',
    props: 1,
    alias: ['탐험'],
    isAdminOnly: false
  }

  private static surround(msg: string): string {
    return '```diff\n' + msg + '\n```'
  }

  async execute(client: Asteroid, msg: Message, args: string[]): Promise<void> {
    if (args.length < 1) {
      const embed = new MessageEmbed()
        .setTitle('사용법')
        .setDescription(`${config().prefix}explore <행성>`)

      msg.channel.send(embed)
      return
    }

    const name = msg.content.split(" ").slice(1).join(' ')
    const planet = PlanetManager.getPlanet(name)

    if (!planet) {
      const embed = new MessageEmbed()
        .setTitle('Error 404: NotFound')
        .setDescription(`행성 ${name}을 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    try {
      const mine = planet as unknown as Minable
      const items = mine.items
      const resultItems: { item: Item, count: number }[] = []

      const count = 10
      let embed = '채광을 준비하는중...'
      let m = await msg.channel.send(Explore.surround(embed))
      await delay(500)

      embed += '\n'
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * items.length)
        const item = items[index]

        if (Math.random() < item.prob) {
          const tem = ItemManager.getItem(item.item)

          if (!tem) {
            Logger.err(`Cannot find item ${item.item} (${__filename})`)

            const ee = new MessageEmbed()
              .setTitle('Internal Error')
              .setDescription('개발자에게 연락해 주십시오.')

            msg.channel.send(ee)
            return
          }

          embed += `\n+ ${tem.info.name}`
          m = await m.edit(Explore.surround(embed))
          const filtered = resultItems.filter(({item}) => item.info.name == tem.info.name)

          if (filtered.length < 1) {
            resultItems.push({item: tem, count: 1})
          } else {
            resultItems.forEach(({item, count}, index) => {
              if (item.info.name == tem.info.name) resultItems[index].count += 1
            })
          }
          await delay(250)
        }
      }

      embed += '\n\n창고에 적재하는중...'
      await delay(2000)
      m = await m.edit(Explore.surround(embed))

      const final = new MessageEmbed()
        .setTitle('탐험 완료!')

      for (const ri of resultItems) {
        for (let i = 0; i < ri.count; i++) {
          await Inventory.create({
            item: ri.item.info.name,
            owner: msg.author.id,
            meta: 0
          })
        }

        final.addField(ri.item.info.name, ri.count + '개', true)
      }

      m.delete()
      msg.channel.send(final)
    } catch (e) {
      const embed = new MessageEmbed()
        .setTitle('Error 400: BadRequest')
        .setDescription(`행성 ${name}은 채광할 수 있는 행성이 아닙니다.`)

      msg.channel.send(embed)
      return
    }
  }
}

export default Explore
