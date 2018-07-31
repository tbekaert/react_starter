import 'cross-fetch/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import ReactGA from 'react-ga';
import App from './pages/app';
import { createToast } from './stores/toasts';
import registerServiceWorker from './registerServiceWorker';

import { initialize, addTranslation } from 'react-localize-redux';
import { languages, translations, defaultLanguage } from './lang';

import 'sanitize.css/sanitize.css';
import './app.min.css';

import env from './env';

ReactGA.initialize(env.GA.code, {
  debug: env.debug
});

history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

store.dispatch(initialize(languages, { defaultLanguage }));
store.dispatch(addTranslation(translations));

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);

registerServiceWorker(store, createToast);
