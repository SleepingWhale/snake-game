import { combineReducers } from 'redux';
import settingsReducer from './settings';
import gameReducer from './game';


export default combineReducers({
  settings: settingsReducer,
  game: gameReducer
});