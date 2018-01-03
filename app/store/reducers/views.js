import { SET_BUDGET_VIEW, SET_CATEGORY_VIEW, SET_ACTION_VIEW,
  REMOVE_BUDGET_VIEW, REMOVE_CATEGORY_VIEW, REMOVE_ACTION_VIEW } from '../actions.js';

const defaultViewState = {
  budgetView: {
    isAdjusting: false
  }
};

export default (state = defaultViewState, action) => {
  switch (action.type) {
    case SET_BUDGET_VIEW:
      return {
        ...state,
        budgetView: {
          isAdjusting: action.isAdjusting
        }
      };
    case SET_CATEGORY_VIEW:
      return {
        ...state,
        categoryView: {
          categoryId: action.categoryId,
          isEditing: action.isEditing,
          isOtherTransactions: action.isOtherTransactions
        }
      };
    case SET_ACTION_VIEW:
      return {
        ...state,
        actionView: {
          actionType: action.actionType
        }
      };
    case REMOVE_BUDGET_VIEW:
      return {
        ...state,
        budgetView: null
      };
    case REMOVE_CATEGORY_VIEW:
      return {
        ...state,
        categoryView: null
      };
    case REMOVE_ACTION_VIEW:
      return {
        ...state,
        actionView: null
      };
    default:
      return state;
  }
};
