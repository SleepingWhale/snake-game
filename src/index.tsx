import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { SettingsPanel } from './components/SettingsPanel';
import { GameBoardContainer } from './containers';


const store = configureStore();
const App = () => (
  <Provider store={store}>
    <div>
      <SettingsPanel />
      <GameBoardContainer />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));