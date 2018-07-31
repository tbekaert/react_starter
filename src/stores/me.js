import ReactGA from 'react-ga';

import Api from '../modules/Api.js';

import { IS_LOADING, ISNT_LOADING } from './isLoading';
import { SET_ERROR, RESET_ERROR } from './error';
import { LOGIN_SUCCESSFUL, LOGIN_FAILED } from './auth';

export const GET_ME_SUCCESSFUL = 'me/GET_ME_SUCCESSFUL';
export const GET_ME_FAILED = 'me/GET_ME_FAILED';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ME_SUCCESSFUL:
      return action.user;

    case GET_ME_FAILED:
      return {};

    default:
      return state;
  }
};
  
export const check = () =>
  dispatch => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: IS_LOADING });

    let token = localStorage.getItem('token');

    if (token){
      getMe(token)
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
    }
    else{
      dispatch({ type: GET_ME_FAILED });
      dispatch({ type: ISNT_LOADING });
    }
  };


export const getMe = (token) =>
  new Promise((resolve, reject) => {
    Api('/me', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        ReactGA.set({ username: res.data.username });
      
        Api.interceptors.request.use((config) => {
          config.headers.Authorization = 'Bearer ' + token;
          return config;
        });

        resolve(res.data);
      })
      .catch(err => {
        if(err.response && err.response.status === 401) localStorage.removeItem('token');

        reject(err);
      });
  });