import { setActiveLanguage } from 'react-localize-redux';

import routes from './routes.js';
import errors from './errors.js';

import nav from './components/nav.js';
import toasts from './components/toasts.js';
import input_errors from './components/input_errors.js';

import login from './pages/login.js';
import profile from './pages/profile.js';
import dashboard from './pages/dashboard.js';
import noMatch from './pages/noMatch.js';

export const languages = ['en', 'fr'];

export const translations = {
  routes,
  nav,
  errors,
  toasts,
  input_errors,
  login,
  profile,
  dashboard,
  noMatch
};

export const defaultLanguage = languages.indexOf(localStorage.getItem('lang')) > -1 ?
  localStorage.getItem('lang') :
  languages.indexOf(navigator.language.slice(0, 2)) > -1 ?
    navigator.language.slice(0, 2) :
    languages[0];

export const setLanguage = (code) =>
  dispatch => {
    dispatch(setActiveLanguage(code));
    localStorage.setItem('lang', code);
  };