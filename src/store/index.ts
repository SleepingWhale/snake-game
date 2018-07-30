import { createStore } from 'redux';
import rootReducer from '../redux';
import { SettingsState } from '../redux/settings';
import { GameState } from '../redux/game';

export interface IStore {
  settings: SettingsState,
  game: GameState
}

const configureStore = (initialState?: IStore) => {
  return createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
};

export default configureStore;