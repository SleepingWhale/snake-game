import * as React from 'react';
import { Cell } from './Cell';
import { DirectionType } from '../redux/game';
import * as styles from './gameBoard.css';
import { KeyCodes } from '../common';



export type ConnectedState = {
  width: number;
  height: number;
  speed: number;
  isRunning: boolean;
  isGameOver: boolean;
  applePosition: number;
  snakePosition: number[];
};

export type ConnectedDispatch = {
  onMakeTurn: (direction: DirectionType) => void;
}

export class GameBoard extends React.Component<ConnectedState & ConnectedDispatch, {}> {
  
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }
  
  componentDidUpdate() {
    if (this.props.isRunning && this.props.isGameOver) {
    }
  }

  onKeyPressed = (e) => {
    switch (e.keyCode) {
      case KeyCodes.left:
        this.props.onMakeTurn('left');
        break;
      case KeyCodes.right:
        this.props.onMakeTurn('right');
        break;
      case KeyCodes.up:
        this.props.onMakeTurn('up');
        break;
      case KeyCodes.down:
        this.props.onMakeTurn('down');
        break;
    }
  };
  
  render() {
    const {
      width,
      height,
      snakePosition,
      applePosition
    } = this.props;
    const cells: JSX.Element[] = [];
    const gameBoardStyle = {
      gridTemplateColumns: `repeat(${width}, 20px)`,
      gridTemplateRows: `repeat(${height}, 20px)`,
    };
    
    for (let i = 0; i < width * height; i++) {
      let status: number = 0;
      
      if (snakePosition.includes(i)) {
        status = 1;
      } else if (i === applePosition) {
        status = 2;
      }
      cells.push(<Cell status={status} key={i} />);
    }
    
    return (
      <div style={gameBoardStyle} className={styles.gameBoard}>
        {cells}
      </div>
    );
  }
}
