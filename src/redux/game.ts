import {
  calcApplePosition,
  calcDirection,
  calcIsDead,
  calcNextCell
} from './gameHelpers';
import {
  DirectionType,
  GameAction, gameMakeMove, gameMakeTurn, gameStart,
  GameState,
  MakeMoveAction,
  MakeTurnAction,
  StarGameAction,
} from '../@types/game';
import { SettingsState } from '../@types/settings';


const GAME_START: gameStart = 'GAME_START';
const GAME_MAKE_TURN: gameMakeTurn = 'GAME_MAKE_TURN';
const GAME_MAKE_MOVE: gameMakeMove = 'GAME_MAKE_MOVE';
const initialState: GameState = {
  isRunning: false,
  isGameOver: false,
  score: 0,
  snakePosition: [],
  snakeDirectionCurrent: 'up',
  snakeDirectionNext: 'up'
};


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
      } = state;
      const { width, height, isTeleportationAllowed } = action.settings;
      const { nextCell, isTeleporting } = calcNextCell(snakeDirectionNext, snakePosition[0], width, height);
      const gotApple: boolean = applePosition === nextCell;
      const isDead: boolean = calcIsDead(nextCell, snakePosition, isTeleportationAllowed, isTeleporting);
      const newSnakePosition: number[] = [nextCell, ...snakePosition];
      
      if (applePosition !== nextCell) {
        newSnakePosition.pop();
      }
      
      return {
        ...state,
        snakePosition: isDead ? snakePosition : newSnakePosition,
        applePosition: gotApple ? calcApplePosition(newSnakePosition, width, height) : applePosition,
        isGameOver: isDead,
        snakeDirectionCurrent: snakeDirectionNext,
        score: gotApple ? state.score + 1 : state.score,
        isRunning: !isDead
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

export const makeTurn = (direction: DirectionType): MakeTurnAction => ({
  type: GAME_MAKE_TURN,
  payload: direction
});

export const makeMove = (settings: SettingsState): MakeMoveAction => ({
  type: GAME_MAKE_MOVE,
  settings
});
