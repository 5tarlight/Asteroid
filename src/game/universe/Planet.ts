export interface PlanetInfo {
  name: string,
  dockable: boolean
}

interface Planet {
  info: PlanetInfo
}

export default Planet
