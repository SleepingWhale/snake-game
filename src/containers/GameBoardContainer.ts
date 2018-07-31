import { connect } from 'react-redux';
import { IStore } from '../store';
import { GameBoard, ConnectedState, ConnectedDispatch } from '../components/GameBoard';
import {Dispatch} from "redux";
import { StarGameAction, startGame, makeMove, makeTurn, TDirection } from '../redux/game';
import { SettingsState } from '../redux/settings';


const mapStateToProps = (state: IStore): IStore => {
  const { game, settings } = state;
  
  return { game, settings };
  
};

const mapDispatchToProps = (dispatch: Dispatch<StarGameAction>) => ({
  onGameStart: (settings: SettingsState) => () => dispatch(startGame(settings)),
  onMakeMove: (settings: SettingsState) => () => dispatch(makeMove(settings)),
  onMakeTurn: (direction: TDirection) => dispatch(makeTurn(direction)),
});

const mergeProps = (stateProps, dispatchProps): ConnectedState & ConnectedDispatch => {
  const { height, width, speed } = stateProps.settings;
  const { snakePosition, isRunning, applePosition } = stateProps.game;

  return {
    ...dispatchProps,
    onMakeMove: dispatchProps.onMakeMove(stateProps.settings),
    onGameStart: dispatchProps.onGameStart(stateProps.settings),
    snakePosition,
    height,
    width,
    speed,
    isRunning,
    applePosition
  };
};

export const GameBoardContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(GameBoard);
