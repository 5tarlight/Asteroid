export enum Galaxy {
  Solar
}

export interface PlanetInfo {
  name: string,
  dockable: boolean,
  system: Galaxy,
  exp: number
}

interface Planet {
  info: PlanetInfo
}

export default Planet
