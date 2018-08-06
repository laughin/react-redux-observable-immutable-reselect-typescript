import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { History } from 'history';

import App from './modules/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import { LifeStore } from './store/model';

const history: History = createHistory();
const initialState: object = {};

const store: LifeStore = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <App />
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
