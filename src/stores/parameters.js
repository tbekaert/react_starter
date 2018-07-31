export const UPDATE_PARAMETER = 'parameters/UPDATE_PARAMETER';

const initialState = {
  viewCounter: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PARAMETER:
      return {
        ...state,
        ...action.parameter
      };
    default:
      return state;
  }
};

export const updateParameter = (parameter) =>
  dispatch => {
    dispatch({
      type: UPDATE_PARAMETER,
      parameter
    });
  };