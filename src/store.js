import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './stores';
import { loadState, saveState } from './utils/localStorage';
import debounce from './utils/debounce';

import env from './env';

export const history = createHistory({ basename: '/react_starter' });

const persistedState = loadState();
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (env.debug) {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  persistedState,
  composedEnhancers
);

store.subscribe(debounce(() => {
  let { me, parameters, counter } = store.getState();
  
  saveState({
    me,
    parameters,
    counter
  });
}, 250));

export default store;