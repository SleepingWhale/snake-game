import * as React from 'react';
import { Cell } from './Cell';


export type ConnectedState = {
  width: number;
  height: number;
  snakePosition: number[];
};

export type ConnectedDispatch = {
  onGameStart: () => void;
}


export class GameBoard extends React.Component<ConnectedState & ConnectedDispatch, {}> {
  
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 32) {
      this.props.onGameStart();
    }
  };
  
  render() {
    const {
      width,
      height,
      snakePosition
    } = this.props;
    const cells = [];
    const gameBoardStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${width}, 20px)`,
      gridTemplateRows: `repeat(${height}, 20px)`,
      gridGap: '1px',
    };
    
    for (let i = 0; i < width * height; i++) {
      const status: number = snakePosition.includes(i) ? 1 : 0;
      cells.push(<Cell status={status} key={i} />);
    }
    
    return (
      <div style={gameBoardStyle}>
        {cells}
      </div>
    );
  }
}
