import { connect } from 'react-redux';
import { IStore } from '../store';
import { GameBoard, ConnectedState, ConnectedDispatch } from '../components/GameBoard';
import {Dispatch} from "redux";
import { StarGameAction, startGame } from '../redux/game';


const mapStateToProps = (state: IStore): ConnectedState => {
  const { height, width } = state.settings;
  const { snakePosition } = state.game;
  
  return {
    height,
    width,
    snakePosition
  };
};

const mapDispatchToProps = (dispatch: Dispatch<StarGameAction>): ConnectedDispatch => ({
  onGameStart: () => dispatch(startGame()),
});


export const GameBoardContainer =
  connect<ConnectedState, ConnectedDispatch, {}>(mapStateToProps, mapDispatchToProps)(GameBoard);
