// @flow

import {CELL_SIZE} from './constants';

import type {
  GameState,
} from './GameTypes';
import type {WorldState} from './WorldTypes';

const BOARD_LENGTH = 7;
export default class World {
  static async init(): Promise<WorldState> {
    const tiles = [];
    const boardTiles = [];

    const boardSize = BOARD_LENGTH*BOARD_LENGTH;
    for (let i = 0; i < boardSize + 1; i++) {
      tiles[i] = {
        id: i,
        type: Math.random() > 2/6 ? 'straight' :  'curve',
        orient: Math.floor(Math.random() * 4),
      };
    }
    for (let i = 0; i < boardSize; i++) {
      boardTiles[i] = tiles[i];
    }
    const swapTile = tiles[boardSize];

    return {
      tiles,
      boardTiles,
      swapTile,
      boardLength: BOARD_LENGTH,
    };
  }

  static tick(
    gameState: GameState,
    dt: number,
  ) {
    const {input, world} = gameState;
    if (input.touching) {
      const boardX = Math.floor(input.touchX / CELL_SIZE);
      const boardY = Math.floor(input.touchY / CELL_SIZE);
      const boardPos = Math.floor(boardY / world.boardLength) + boardX % world.boardLength;
      const touchedTile = world.boardTiles[boardPos];
      console.warn(`touchedTile.id: ${touchedTile.id}`)
      world.boardTiles[boardPos] = world.swapTile;
      world.swapTile = touchedTile;
    }

  }
}