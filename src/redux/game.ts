import { SettingsState } from './settings';

export type TDirection = 'left' | 'right' | 'up' | 'down';

export interface GameState {
  isRunning: boolean;
  isGameOver: boolean;
  score: number;
  applePosition?: number;
  snakePosition: number[];
  snakeDirectionCurrent: TDirection;
  snakeDirectionNext: TDirection;
}

const initialState: GameState = {
  isRunning: false,
  isGameOver: false,
  score: 0,
  snakePosition: [],
  snakeDirectionCurrent: 'up',
  snakeDirectionNext: 'up'
};


const GAME_START = 'GAME_START';
type GAME_START = typeof GAME_START;

const GAME_MAKE_TURN = 'GAME_MAKE_TURN';
type GAME_MAKE_TURN = typeof GAME_MAKE_TURN;

const GAME_MAKE_MOVE = 'GAME_MAKE_MOVE';
type GAME_MAKE_MOVE = typeof GAME_MAKE_MOVE;


export interface StarGameAction {
  type: GAME_START;
  settings: SettingsState;
}

export interface MakeTurnAction {
  type: GAME_MAKE_TURN;
  payload: TDirection;
}

export interface MakeMoveAction {
  type: GAME_MAKE_MOVE;
  settings: SettingsState;
}

type GameAction = StarGameAction | MakeTurnAction | MakeMoveAction;


export default function reducer(state: GameState = initialState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_START: {
      const { width, height } = action.settings;
      const snakePosition: number[] = [width * Math.floor(height / 2) + Math.floor(width / 2)];
      
      return {
        ...initialState,
        isRunning: true,
        snakePosition,
        applePosition: calcApplePosition(snakePosition, width, height)
      };
    }
    case GAME_MAKE_TURN:
      return {
        ...state,
        snakeDirectionNext: calcDirection(action.payload, state.snakeDirectionCurrent, state.snakePosition),
      };
    case GAME_MAKE_MOVE: {
      const {
        snakeDirectionNext,
        snakePosition,
        applePosition
      } = state;
      const { width, height } = action.settings;
      const nextCell = calcNextCell(snakeDirectionNext, snakePosition[0], width, height);
      const gotApple: boolean = applePosition === nextCell;
      const isDead: boolean = calcIsDead(nextCell, snakePosition, width, height);
      const newSnakePosition: number[] = [nextCell, ...snakePosition];
      
      if (applePosition !== nextCell && !isDead) {
        newSnakePosition.pop()
      }
      
      return {
        ...state,
        snakePosition: newSnakePosition,
        applePosition: gotApple ? calcApplePosition(newSnakePosition, width, height) : applePosition,
        isGameOver: isDead,
        snakeDirectionCurrent: snakeDirectionNext
      };
    }
    default:
      return state;
  }
}


export const startGame = (settings: SettingsState): StarGameAction => ({
  type: GAME_START,
  settings
});

export const makeTurn = (direction: TDirection): MakeTurnAction => ({
  type: GAME_MAKE_TURN,
  payload: direction
});

export const makeMove = (settings: SettingsState): MakeMoveAction => ({
  type: GAME_MAKE_MOVE,
  settings
});

function calcNextCell(direction: TDirection, currentCell: number, width: number, height: number): number {
  switch (direction) {
    case 'left':
      return currentCell - 1;
    case 'right':
      return currentCell + 1;
    case 'up':
      return currentCell - width;
    case 'down':
      return currentCell + width;
  }
}

function calcDirection(newDirection: TDirection, prevDirection: TDirection, snakePosition: number[]): TDirection {
  if (((newDirection === 'left' && prevDirection === 'right')
    || (newDirection === 'right' && prevDirection === 'left')
    || (newDirection === 'up' && prevDirection === 'down')
    || (newDirection === 'down' && prevDirection === 'up')) && snakePosition.length > 1) { return prevDirection}
    
  return newDirection;
}

function calcApplePosition(snakePosition: number[], width: number, height: number): number {
  const cellsQty: number = width * height;
  let result: number;
  
  do {
    result = Math.floor(Math.random() * cellsQty)
  } while (snakePosition.includes(result));
  
  return result;
}

function calcIsDead(nextCell: number, snakePosition: number[], width: number, height: number): boolean {
  return snakePosition.includes(nextCell);
}
