// @flow

import type {WorldState} from './WorldTypes';
import type {RenderingState} from './RenderingTypes';

export type InputState = {
  touching: boolean,
  touchX: number,
  touchY: number,
};

export type GameState = {
  world: WorldState,
  rendering: RenderingState,
  input: InputState,
};
