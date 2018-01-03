import { ADD_CATEGORY, ADD_CATEGORIES, REMOVE_CATEGORY } from '../actions.js';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.category];
    case ADD_CATEGORIES:
      return [...state, ...action.categories];
    case REMOVE_CATEGORY:
      let categoryIndex = state.findIndex(category =>
        category.categoryId === action.categoryId);
      if (categoryIndex === -1) {
        return state;
      } else {
        return [
          ...state.slice(0, categoryIndex),
          ...state.slice(categoryIndex + 1)
        ];
      }
    default:
      return state;
  }
};
