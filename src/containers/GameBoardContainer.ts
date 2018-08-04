import { connect } from 'react-redux';
import { IStore } from '../store';
import { GameBoard, ConnectedState, ConnectedDispatch } from '../components/GameBoard';
import {Dispatch} from "redux";
import { StarGameAction, makeTurn, TDirection } from '../redux/game';


const mapStateToProps = (state: IStore): IStore => {
  const { game, settings } = state;
  
  return { game, settings };
  
};

const mapDispatchToProps = (dispatch: Dispatch<StarGameAction>) => ({
  onMakeTurn: (direction: TDirection) => dispatch(makeTurn(direction)),
});

const mergeProps = (stateProps, dispatchProps): ConnectedState & ConnectedDispatch => {
  const { height, width, speed } = stateProps.settings;
  const { snakePosition, isRunning, applePosition, isGameOver } = stateProps.game;

  return {
    ...dispatchProps,
    snakePosition,
    height,
    width,
    speed,
    isRunning,
    isGameOver,
    applePosition
  };
};

export const GameBoardContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(GameBoard);
