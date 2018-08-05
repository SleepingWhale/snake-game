import { createStore } from 'redux';
import rootReducer from '../redux';
import { GameState } from '../@types/game';
import { SettingsState } from '../@types/settings';


export type IStore = {
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
