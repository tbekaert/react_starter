import ReactGA from 'react-ga';

import { IS_LOADING, ISNT_LOADING } from './isLoading';
import { RESET_ERROR } from './error';
import { LOGIN_SUCCESSFUL } from './auth';

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

const mockedUser = {
  username: 'tbekaert',
  firstname: 'Thomas',
  lastname: 'Bekaert'
};
  
export const check = () =>
  dispatch => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: IS_LOADING });

    let token = localStorage.getItem('token');

    if (token){
      dispatch({
        type: GET_ME_SUCCESSFUL,
        user: mockedUser
      });

      dispatch({ type: LOGIN_SUCCESSFUL });
      dispatch({ type: ISNT_LOADING });
    }
    else{
      dispatch({ type: GET_ME_FAILED });
      dispatch({ type: ISNT_LOADING });
    }
  };


export const getMe = (token) =>
  new Promise((resolve, reject) => {
    ReactGA.set({ username: mockedUser.username });

    resolve(mockedUser);
  });