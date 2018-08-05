import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStore } from '../store';
import { SettingsPanel, ConnectedState, ConnectedDispatch } from '../components/SettingsPanel';
import { makeMove, startGame } from '../redux/game';
import { updateSettings } from '../redux/settings';
import { StarGameAction } from '../@types/game';
import { SettingsState } from '../@types/settings';


const mapStateToProps = (state: IStore): IStore => {
  const { game, settings } = state;
  
  return { game, settings };
  
};

const mapDispatchToProps = (dispatch: Dispatch<StarGameAction>) => ({
  onGameStart: (settings: SettingsState) => () => dispatch(startGame(settings)),
  onCheckboxChange: (event) => {
    const { checked, name } = event.currentTarget;
    
    dispatch(updateSettings({ value: checked, name }));
  },
  onRangeChange: (event) => {
    const { value, name } = event.currentTarget;
    
    dispatch(updateSettings({ value: parseInt(value, 10), name }));
  },
  onMakeMove: (settings: SettingsState) => () => dispatch(makeMove(settings)),
});

const mergeProps = (stateProps, dispatchProps): ConnectedState & ConnectedDispatch => {
  const { isRunning, isGameOver, score } = stateProps.game;
  
  return {
    ...dispatchProps,
    ...stateProps.settings,
    onGameStart: dispatchProps.onGameStart(stateProps.settings),
    onMakeMove: dispatchProps.onMakeMove(stateProps.settings),
    isRunning,
    isGameOver,
    score
  };
};

export const SettingsPanelContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsPanel);
