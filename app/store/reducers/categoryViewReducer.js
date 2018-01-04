import { SET_CATEGORY_VIEW, REMOVE_CATEGORY_VIEW } from '../actions.js';

export default (state = null, action) => {
  switch (action.type) {
    case SET_CATEGORY_VIEW:
      return {
        categoryId: action.categoryId,
        isEditing: action.isEditing,
        isOtherTransactions: action.isOtherTransactions
      };
    case REMOVE_CATEGORY_VIEW:
      return null;
    default:
      return state;
  }
}
