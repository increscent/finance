import { SET_CATEGORY_VIEW, REMOVE_CATEGORY_VIEW, EDIT_CATEGORY } from '../actions.js';

export default (state = null, action, globalState) => {
  switch (action.type) {
    case SET_CATEGORY_VIEW:
      let category = (action.isEditing)?
        globalState.categories.find(category =>
          category.categoryId === action.categoryId)
        : {};

      return {
        categoryId: action.categoryId,
        isEditing: action.isEditing,
        isOtherTransactions: action.isOtherTransactions,
        category
      };
    case REMOVE_CATEGORY_VIEW:
      return null;
    case EDIT_CATEGORY:
      return {
        ...state,
        category: {
          ...state.category,
          ...action.category
        }
      }
    default:
      return state;
  }
}
