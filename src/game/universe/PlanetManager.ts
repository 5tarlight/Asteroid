import Earth from "./solar/Earth";
import Planet from "./Planet";
import Sun from "./solar/Sun";

class PlanetManager {
  public static planets: Planet[] = [
    new Sun(),
    new Earth()
  ]

  public static getPlanet(name: string): Planet | null {
    const planet = this.planets.filter(p => p.info.name == name)
    if (planet && planet.length > 0)
      return planet[0]
    else
      return null
  }
}

export default PlanetManager
