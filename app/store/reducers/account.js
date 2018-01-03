import { SET_IS_LOGGED_IN, SET_CURRENT_PERIOD_ID } from '../actions.js';

const defaultAccountState = {
  isLoggedIn: false
};

export default (state = defaultAccountState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    case SET_CURRENT_PERIOD_ID:
      return {
        ...state,
        currentPeriodId: action.currentPeriodId
      }
    default:
      return state;
  }
};
