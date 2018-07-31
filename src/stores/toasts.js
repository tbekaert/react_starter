export const ADD_TOAST = 'toast/ADD_TOAST';
export const REMOVE_TOAST = 'toast/REMOVE_TOAST';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOAST:
      return [
        ...state,
        {
          ...action.toast,
          id: state.reduce((tot, t) => t.id >= tot ? t.id + 1 : tot, []) || 0
        }
      ];
    case REMOVE_TOAST:
      return [
        ...state.filter(t => t.id !== action.id)
      ];

    default:
      return state;
  }
};

export const createToast = type => ({
  type: ADD_TOAST,
  toast: { type }
});

export const addToast = type =>
  dispatch => {
    dispatch(createToast(type));
  };

export const removeToast = id =>
  dispatch => {
    dispatch({
      type: REMOVE_TOAST,
      id
    });
  };