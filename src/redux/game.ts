import { SettingsState } from './settings';

export type TDirection = 'left' | 'right' | 'up' | 'down';

export interface GameState {
  isRunning: boolean;
  score: number;
  applePosition: number;
  snakePosition: number[];
  snakeDirection: TDirection;
}

export interface SettingsActionPayload {
  name: string;
  value: number;
}

const initialState: GameState = {
  isRunning: false,
  score: 0,
  applePosition: 0,
  snakePosition: [13,14,15,16,17,18],
  snakeDirection: 'right'
};


const GAME_START = 'GAME_START';
type GAME_START = typeof GAME_START;

const GAME_MAKE_TURN = 'GAME_MAKE_TURN';
type GAME_MAKE_TURN = typeof GAME_MAKE_TURN;

const GAME_MAKE_MOVE = 'GAME_MAKE_MOVE';
type GAME_MAKE_MOVE = typeof GAME_MAKE_MOVE;


export interface StarGameAction {
  type: GAME_START;
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
        
      };
    case GAME_MAKE_TURN:
      return {
        ...state,
        snakeDirection: action.payload,
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


export const startGame = (): StarGameAction => ({
  type: GAME_START
});

export const makeTurn = (direction: TDirection): MakeTurnAction => ({
  type: GAME_MAKE_TURN,
  payload: direction
});

export const makeMove = (settings: SettingsState): MakeMoveAction => ({
  type: GAME_MAKE_MOVE,
  settings
});

function calcNextCell(direction: TDirection, currentCell: number, width: number, height?: number): number {
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