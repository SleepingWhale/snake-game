import { SettingsState } from './settings';

export type TDirection = 'left' | 'right' | 'up' | 'down';

export interface GameState {
  isRunning: boolean;
  score: number;
  applePosition?: number;
  snakePosition: number[];
  snakeDirection: TDirection;
}

const initialState: GameState = {
  isRunning: false,
  score: 0,
  snakePosition: [13,14],
  snakeDirection: 'down'
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
    case GAME_START:
      return {
        ...initialState,
        isRunning: true,
        applePosition: calcApplePosition(initialState.snakePosition, action.settings.width, action.settings.height)
      };
    case GAME_MAKE_TURN:
      return {
        ...state,
        snakeDirection: calcDirection(action.payload, state.snakeDirection, state.snakePosition),
      };
    case GAME_MAKE_MOVE: {
      const {
        snakeDirection,
        snakePosition,
        applePosition
      } = state;
      const { width, height } = action.settings;
      const nextCell = calcNextCell(snakeDirection, snakePosition[0], width, height);
      const newSnakePosition: number[] = [nextCell, ...snakePosition.slice(0, snakePosition.length - 1)];
      
      
      return {
        ...state,
        snakePosition: newSnakePosition
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