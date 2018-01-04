import { ADD_CATEGORY, ADD_CATEGORIES, REMOVE_CATEGORY, UPDATE_CATEGORY } from '../actions.js';

export default (state = [], action) => {
  let index = -1;
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.category];
    case ADD_CATEGORIES:
      return [...state, ...action.categories];
    case REMOVE_CATEGORY:
      index = state.findIndex(category =>
        category.categoryId === action.categoryId);
      if (index === -1) {
        return state;
      } else {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
    case UPDATE_CATEGORY:
      index = state.findIndex(category =>
        category.categoryId === action.categoryId);
      if (index === -1) return state;

      let category = state[index];
      return [
        ...state.slice(0, index),
        {
          ...category,
          ...action.category
        },
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};
