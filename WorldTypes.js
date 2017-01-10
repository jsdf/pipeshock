// @flow

type TileType = 'curve' | 'straight';
type Tile = {
  id: number,
  type: TileType,
  orient: number,
}

export type WorldState = {
  tiles: Array<Tile>,
  boardTiles: Array<Tile>,
  boardLength: number,
  swapTile: Tile,
};
