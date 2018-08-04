import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { Layout } from './components/Layout';


const store = configureStore();
const App = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
