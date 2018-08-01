import { SettingsState } from './settings';

export type TDirection = 'left' | 'right' | 'up' | 'down';

type TNextStep = {
  nextCell: number;
  isTeleporting: boolean;
}

export interface GameState {
  isRunning: boolean;
  isGameOver: boolean;
  isTeleportingAllowed: boolean;
  score: number;
  applePosition?: number;
  snakePosition: number[];
  snakeDirectionCurrent: TDirection;
  snakeDirectionNext: TDirection;
}

const initialState: GameState = {
  isRunning: false,
  isGameOver: false,
  isTeleportingAllowed: false,
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
        applePosition,
        isTeleportingAllowed,
      } = state;
      const { width, height } = action.settings;
      const { nextCell, isTeleporting } = calcNextCell(snakeDirectionNext, snakePosition[0], width, height);
      const gotApple: boolean = applePosition === nextCell;
      const isDead: boolean = calcIsDead(nextCell, snakePosition, isTeleportingAllowed, isTeleporting);
      const newSnakePosition: number[] = [nextCell, ...snakePosition];
      
      if (applePosition !== nextCell) {
        newSnakePosition.pop();
      }
      
      return {
        ...state,
        snakePosition: isDead ? snakePosition : newSnakePosition,
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

function calcNextCell(direction: TDirection, currentCell: number, width: number, height: number): TNextStep {
  const nextStep: TNextStep = {
    nextCell: 0,
    isTeleporting: false
  };
  
  switch (direction) {
    case 'left':
      nextStep.nextCell = currentCell - 1;
      if (currentCell % width === 0) {
        nextStep.nextCell = nextStep.nextCell + width;
        nextStep.isTeleporting = true;
      }
      break;
    case 'right':
      nextStep.nextCell = currentCell + 1;
      if (nextStep.nextCell % width === 0) {
        nextStep.nextCell = nextStep.nextCell - width;
        nextStep.isTeleporting = true;
      }
      break;
    case 'up':
      nextStep.nextCell = currentCell - width;
      if (nextStep.nextCell < 0) {
        nextStep.nextCell = currentCell + width * (height - 1);
        nextStep.isTeleporting = true;
      }
      break;
    case 'down':
      nextStep.nextCell = currentCell + width;
      if (nextStep.nextCell > width * height -1) {
        nextStep.nextCell = currentCell - width * (height - 1);
        nextStep.isTeleporting = true;
      }
      break;
  }
  
  return nextStep;
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

function calcIsDead(nextCell: number, snakePosition: number[], isTeleportingAllowed: boolean, isTeleporting: boolean): boolean {
  return snakePosition.includes(nextCell) || (!isTeleportingAllowed && isTeleporting);
}
