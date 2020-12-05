import Planet, {Galaxy, PlanetInfo} from "../Planet";

class Sun implements Planet {
  info: PlanetInfo = {
    name: '태양',
    dockable: false,
    system: Galaxy.Solar
  }
}

export default Sun
