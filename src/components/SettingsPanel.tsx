import * as React from 'react';
import * as styles from './settingsPanel.css';
import { keyCodes } from '../common';


export type ConnectedState = {
  isRunning: boolean;
  isGameOver: boolean;
  width: number;
  height: number;
  speed: number;
  isTeleportationAllowed: boolean;
};

export type ConnectedDispatch = {
  onGameStart: () => void;
  onMakeMove: () => void;
  onCheckboxChange(event: React.FormEvent<HTMLInputElement>): void;
  onRangeChange(event: React.FormEvent<HTMLInputElement>): void;
}

export class SettingsPanel extends React.Component<ConnectedState & ConnectedDispatch, {isPaused: boolean}> {
  
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
    switch (e.keyCode) {
      case keyCodes.space:
        this.startGame();
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
    this.interval = setInterval(this.props.onMakeMove, 5000 / this.props.speed);
  };
  
  stopMoving = () => {
    clearInterval(this.interval);
  };
  
  startGame = () => {
    if (this.props.isRunning) this.stopMoving();
    this.props.onGameStart();
    this.startMoving();
  };
  
  render() {
    const {
      width,
      height,
      speed,
      isTeleportationAllowed,
      onCheckboxChange,
      onRangeChange,
      isRunning,
      isGameOver
    } = this.props;
    const isFormDisabled = isRunning && !isGameOver;
    
    return (
      <div className={styles.settingsPanel}>
        <div className={styles.settingsItem}>
          <label htmlFor="width">Width</label>
          <input
            name="width"
            value={width}
            type="range"
            onChange={onRangeChange}
            min={5}
            max={60}
            disabled={isFormDisabled}
          />
          {width}
        </div>
        <div className={styles.settingsItem}>
          <label htmlFor="height">Height</label>
          <input
            name="height"
            value={height}
            type="range"
            onChange={onRangeChange}
            min={5}
            max={30}
            disabled={isFormDisabled}
          />
          {height}
        </div>
        <div className={styles.settingsItem}>
          <label htmlFor="speed">Speed</label>
          <input
            name="speed"
            value={speed}
            type="range"
            onChange={onRangeChange}
            min={1}
            max={100}
            disabled={isFormDisabled}
          />
          {speed}
        </div>
        <div className={styles.settingsItem}>
          <label htmlFor="isTeleportationAllowed">Allow teleportation</label>
          <input
            name="isTeleportationAllowed"
            type="checkbox"
            checked={isTeleportationAllowed}
            onChange={onCheckboxChange}
            disabled={isFormDisabled}
          />
        </div>
        <div className={styles.settingsItem}>
          <button onClick={this.startGame}>{isRunning ? 'Restart' : 'Start!'}</button>
        </div>
      </div>
    );
  }
}
