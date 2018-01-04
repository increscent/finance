import { SET_ACTION_VIEW, REMOVE_ACTION_VIEW, UPDATE_NEW_CATEGORY } from '../actions.js';
import { CATEGORY_ADD, CATEGORY_DELETE, TRANSACTION_ADD }
  from '../../components/views/actionView/actionView.js';

export default (state = null, action) => {
  switch (action.type) {
    case SET_ACTION_VIEW:
      switch (action.actionType) {
        case CATEGORY_ADD:
          return {
            actionType: action.actionType,
            category: {
              allowanceType: '$',
              name: '',
              allowance: ''
            }
          };
        default:
          return {
            actionType: action.actionType
          };
      }
    case UPDATE_NEW_CATEGORY:
      return {
        ...state,
        category: {
          ...state.category,
          ...action.category
        }
      };
    case REMOVE_ACTION_VIEW:
      return null;
    default:
      return state;
  }
}
