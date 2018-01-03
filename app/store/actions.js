// Account Actions

export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_CURRENT_PERIOD_ID = 'SET_CURRENT_PERIOD_ID';

export const setIsLoggedIn = (isLoggedIn) => ({
  type: SET_IS_LOGGED_IN,
  isLoggedIn
});

export const setCurrentPeriodId = (currentPeriodId) => ({
  type: SET_CURRENT_PERIOD_ID,
  currentPeriodId
});

// Category Actions

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  category
});

export const addCategories = (categories) => ({
  type: ADD_CATEGORIES,
  categories
});

export const removeCategory = (categoryId) => ({
  type: REMOVE_CATEGORY,
  categoryId
});

// Transaction Actions

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';

export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  transaction
});

export const addTransactions = (transactions) => ({
  type: ADD_TRANSACTIONS,
  transactions
});

export const removeTransaction = (transactionId) => ({
  type: REMOVE_TRANSACTION,
  transactionId
});

// View actions

export const SET_BUDGET_VIEW = 'SET_BUDGET_VIEW';
export const SET_CATEGORY_VIEW = 'SET_CATEGORY_VIEW';
export const SET_ACTION_VIEW = 'SET_ACTION_VIEW';
export const REMOVE_BUDGET_VIEW = 'REMOVE_BUDGET_VIEW';
export const REMOVE_CATEGORY_VIEW = 'REMOVE_CATEGORY_VIEW';
export const REMOVE_ACTION_VIEW = 'REMOVE_ACTION_VIEW';

export const setBudgetView = (isAdjusting) => ({
  type: SET_BUDGET_VIEW,
  isAdjusting
});

export const setCategoryView = (categoryId, isEditing, isOtherTransactions) => ({
  type: SET_CATEGORY_VIEW,
  categoryId,
  isEditing,
  isOtherTransactions
});

export const setActionView = (actionType) => ({
  type: SET_ACTION_VIEW,
  actionType
});

export const removeBudgetView = () => ({
  type: REMOVE_BUDGET_VIEW
});

export const removeCategoryView = () => ({
  type: REMOVE_CATEGORY_VIEW
});

export const removeActionView = () => ({
  type: REMOVE_ACTION_VIEW
});
