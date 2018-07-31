export const SET_ERROR = 'error/SET_ERROR';
export const RESET_ERROR = 'error/RESET_ERROR';

const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.value;
    case RESET_ERROR:
      return '';

    default:
      return state;
  }
};