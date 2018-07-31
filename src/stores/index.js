import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { localeReducer as locale } from 'react-localize-redux';

import isLoading from './isLoading';
import error from './error';
import auth from './auth.mock.js';
import me from './me.mock.js';
import toasts from './toasts';
import counter from './counter.example.js';
import parameters from './parameters.js';

export default combineReducers({
  router: routerReducer,
  locale,
  isLoading,
  error,
  auth,
  me,
  toasts,
  counter,
  parameters
});
