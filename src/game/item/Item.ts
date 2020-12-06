export interface ItemInfo {
  name: string,
  count: number,
  meta: number,
  exp: number
}

interface Item {
  info :ItemInfo
}

export default Item
