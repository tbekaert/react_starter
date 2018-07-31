import { IS_LOADING, ISNT_LOADING } from './isLoading';
import { RESET_ERROR } from './error';

export const POST_INCREMENT = 'counter/POST_INCREMENT';
export const POST_DECREMENT = 'counter/POST_DECREMENT';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_INCREMENT:
      return state + 1;
    case POST_DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export const increment = () =>
  dispatch => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: IS_LOADING });

    dispatch({
      type: POST_INCREMENT
    });
    dispatch({ type: ISNT_LOADING });
  };

export const decrement = () =>
  dispatch => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: IS_LOADING });

    dispatch({
      type: POST_DECREMENT
    });
    dispatch({ type: ISNT_LOADING });
  };