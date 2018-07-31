import Api from '../modules/Api.js';

import { IS_LOADING, ISNT_LOADING } from './isLoading';
import { SET_ERROR, RESET_ERROR } from './error';

import {
  getMe,
  GET_ME_SUCCESSFUL,
  GET_ME_FAILED
} from './me';

export const LOGIN_SUCCESSFUL = 'auth/LOGIN_SUCCESSFUL';
export const LOGIN_FAILED = 'auth/LOGIN_FAILED';

export const RESET_SUCCESSFUL = 'auth/RESET_SUCCESSFUL';

export const NEW_SUCCESSFUL = 'auth/NEW_SUCCESSFUL';

export const LOGOUT_REQUESTED = 'auth/LOGOUT_REQUESTED';

const initialState = {
  isAuthenticated: false,
  message: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isAuthenticated: true,
        message: undefined
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        message: undefined
      };
    case RESET_SUCCESSFUL:
      return {
        ...state,
        isAuthenticated: false,
        message: action.message
      };
    case NEW_SUCCESSFUL:
      return {
        ...state,
        isAuthenticated: false,
        message: action.message
      };
    case LOGOUT_REQUESTED:
      return {
        ...state,
        isAuthenticated: false,
        message: action.message
      };
    default:
      return state;
  }
};

export const submit = (data, section, message) => {
  return dispatch => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: IS_LOADING });

    switch(section){
      case 'login':
        Api('/login_check', {
          method: 'POST',
          data: data
        })
          .then(res => {
            localStorage.setItem('token', res.data.token);

            getMe(res.data.token)
              .then(user => {
                dispatch({
                  type: GET_ME_SUCCESSFUL,
                  user: user
                });
          
                dispatch({ type: LOGIN_SUCCESSFUL });
                dispatch({ type: ISNT_LOADING });
              })
              .catch(err => {
                dispatch({
                  type: SET_ERROR,
                  value: (err.response && err.response.status === 401) ? 'unauthorized' : 'error'
                });
          
                dispatch({ type: GET_ME_FAILED });
                dispatch({ type: LOGIN_FAILED });
                dispatch({ type: ISNT_LOADING });
              });
          })
          .catch(err => {
            dispatch({
              type: SET_ERROR,
              value: (err.response && err.response.status === 401) ? 'unauthorized' : 'error'
            });
            dispatch({ type: ISNT_LOADING });
          });

        break;

      case 'reset':
        Api('/reset_password', {
          method: 'POST',
          data: data
        })
          .then(res => {
            dispatch({
              type: RESET_SUCCESSFUL,
              message: message
            });
            dispatch({ type: ISNT_LOADING });
          });

        break;

      case 'new':
        Api('/new_password', {
          method: 'PUT',
          data: data
        })
          .then(res => {
            dispatch({
              type: NEW_SUCCESSFUL,
              message: message
            });
            dispatch({ type: ISNT_LOADING });
          });

        break;

      default:
        break;
    }
  };
};

export const logout = () => 
  dispatch => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: IS_LOADING });
    localStorage.removeItem('token');
    
    dispatch({ type: LOGOUT_REQUESTED });
    dispatch({ type: ISNT_LOADING });
  };