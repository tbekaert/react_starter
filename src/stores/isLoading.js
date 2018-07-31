export const IS_LOADING = 'isLoading/IS_LOADING';
export const ISNT_LOADING = 'isLoading/ISNT_LOADING';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return true;
    case ISNT_LOADING:
      return false;
    default:
      return state;
  }
};