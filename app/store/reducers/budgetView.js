import { SET_BUDGET_VIEW, REMOVE_BUDGET_VIEW, ADJUST_CATEGORY } from '../actions.js';

const defaultBudgetViewState = {
  isAdjusting: false
};

export default (state = defaultBudgetViewState, action) => {
  switch (action.type) {
    case SET_BUDGET_VIEW:
      let categories = (action.isAdjusting)?
        action.categories.map(category => ({
          categoryId: category.categoryId,
          name: category.name,
          currentLimit: category.currentLimit,
          previousLimit: category.currentLimit
        })) : null;

      return {
        isAdjusting: action.isAdjusting,
        categories
      };
    case REMOVE_BUDGET_VIEW:
      return null;
    case ADJUST_CATEGORY:
      let index = state.categories.findIndex(category =>
        category.categoryId === action.categoryId);
      if (index === -1) return state;

      let category = state.categories[index];
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, index),
          {
            ...category,
            currentLimit: action.currentLimit
          },
          ...state.categories.slice(index + 1)
        ]
      };
    default:
      return state;
  }
}
