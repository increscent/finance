import { SET_ACTION_VIEW, REMOVE_ACTION_VIEW } from '../actions.js';

export default (state = null, action) => {
  switch (action.type) {
    case SET_ACTION_VIEW:
      return {
        actionType: action.actionType
      };
    case REMOVE_ACTION_VIEW:
      return null;
    default:
      return state;
  }
}
