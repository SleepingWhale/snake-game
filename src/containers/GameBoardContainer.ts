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
  onGameStart: () => dispatch(startGame()),
  onMakeMove: (settings: SettingsState) => () => dispatch(makeMove(settings)),
  onMakeTurn: (direction: TDirection) => dispatch(makeTurn(direction)),
});

const mergeProps = (stateProps, dispatchProps): ConnectedState & ConnectedDispatch => {
  const { height, width } = stateProps.settings;
  const { snakePosition } = stateProps.game;

  return {
    height,
    width,
    snakePosition,
    ...dispatchProps,
    onMakeMove: dispatchProps.onMakeMove(stateProps.settings)
  };
};

export const GameBoardContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(GameBoard);
