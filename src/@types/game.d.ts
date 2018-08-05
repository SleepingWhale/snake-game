import { SettingsState } from './settings';

export type DirectionType = 'left' | 'right' | 'up' | 'down';

export type GameState = {
  isRunning: boolean;
  isGameOver: boolean;
  score: number;
  applePosition?: number;
  snakePosition: number[];
  snakeDirectionCurrent: DirectionType;
  snakeDirectionNext: DirectionType;
}

declare const GAME_START = 'GAME_START';
export type gameStart = typeof GAME_START;

declare const GAME_MAKE_TURN = 'GAME_MAKE_TURN';
export type gameMakeTurn = typeof GAME_MAKE_TURN;

declare const GAME_MAKE_MOVE = 'GAME_MAKE_MOVE';
export type gameMakeMove = typeof GAME_MAKE_MOVE;

export type StarGameAction = {
  type: gameStart;
  settings: SettingsState;
}

export type MakeTurnAction = {
  type: gameMakeTurn;
  payload: DirectionType;
}

export type MakeMoveAction = {
  type: gameMakeMove;
  settings: SettingsState;
}

export type GameAction = StarGameAction | MakeTurnAction | MakeMoveAction;
