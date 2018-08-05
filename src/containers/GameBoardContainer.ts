import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStore } from '../store';
import { GameBoard, ConnectedState, ConnectedDispatch } from '../components/GameBoard';
import { makeTurn } from '../redux/game';
import { DirectionType, StarGameAction } from '../@types/game';


const mapStateToProps = (state: IStore): ConnectedState => {
  const { height, width, speed } = state.settings;
  const { snakePosition, isRunning, applePosition, isGameOver } = state.game;
  
  return {
    snakePosition,
    height,
    width,
    speed,
    isRunning,
    isGameOver,
    applePosition
  };
  
};

const mapDispatchToProps = (dispatch: Dispatch<StarGameAction>): ConnectedDispatch => ({
  onMakeTurn: (direction: DirectionType) => dispatch(makeTurn(direction)),
});


export const GameBoardContainer = connect<ConnectedState, ConnectedDispatch>(mapStateToProps, mapDispatchToProps)(GameBoard);
