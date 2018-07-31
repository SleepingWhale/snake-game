import * as React from 'react';
import { Cell } from './Cell';
import { TDirection } from '../redux/game';

enum keyCodes {
  left = 37,
  up = 38,
  right = 39,
  down = 40,
  space = 32,
  pause = 80
}


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
  onGameStart: () => void;
  onMakeMove: () => void;
  onMakeTurn: (direction: TDirection) => void;
}


export class GameBoard extends React.Component<ConnectedState & ConnectedDispatch, {isPaused: boolean}> {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isPaused: false
    }
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
    this.stopMoving();
  }
  
  componentDidUpdate() {
    if (this.props.isRunning && this.props.isGameOver) {
      this.stopMoving();
    }
  }

  onKeyPressed = (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case keyCodes.space:
        if (this.props.isRunning) this.stopMoving();
        this.props.onGameStart();
        this.startMoving();
        break;
      case keyCodes.left:
        this.props.onMakeTurn('left');
        break;
      case keyCodes.right:
        this.props.onMakeTurn('right');
        break;
      case keyCodes.up:
        this.props.onMakeTurn('up');
        break;
      case keyCodes.down:
        this.props.onMakeTurn('down');
        break;
      case keyCodes.pause: {
        const { isPaused } = this.state;
        
        if (isPaused) {
          this.startMoving();
        } else {
          this.stopMoving();
        }
        this.setState(() => ({ isPaused: !isPaused }));
        break;
      }
    }
  };
  
  interval;
  
  startMoving = () => {
    this.interval = setInterval(this.props.onMakeMove, 1000 / this.props.speed);
  };
  
  stopMoving = () => {
    clearInterval(this.interval);
  };
  
  
  render() {
    const {
      width,
      height,
      snakePosition,
      applePosition
    } = this.props;
    const cells = [];
    const gameBoardStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${width}, 20px)`,
      gridTemplateRows: `repeat(${height}, 20px)`,
      gridGap: '1px',
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
      <div style={gameBoardStyle}>
        {cells}
      </div>
    );
  }
}
