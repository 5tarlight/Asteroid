import Planet, { PlanetInfo } from "../Planet";
import Minable, { MinableItem } from "../Minable";

class Earth implements Planet, Minable {
  info: PlanetInfo = {
    dockable: true,
    name: '지구'
  }
  items: MinableItem[] = [
    {
      item: 'dirt',
      prob: 1
    },
    {
      item: 'stone',
      prob: 0.5
    }
  ]
}

export default Earth
