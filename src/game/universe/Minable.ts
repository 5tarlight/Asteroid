export interface MinableItem {
  item: string,
  // 0 < prob <= 100
  prob: number
}

interface Minable {
  items: string[]
}

export default Minable
