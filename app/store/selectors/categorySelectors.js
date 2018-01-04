import { getCategoryTotalDebits } from './transactionSelectors.js';

export const getCategory = (state, categoryId) =>
  state.categories.find(category => category.categoryId === categoryId);

export const getCategoriesWithBalance = (state) =>
  state.categories.map(category => ({
    ...category,
    balance: category.currentLimit -
      getCategoryTotalDebits(state, category.categoryId)
  }));

export const getAdjustedCategoriesWithDebits = (state) =>
  state.views.budgetView.categories.map(category => ({
    ...category,
    debits: getCategoryTotalDebits(state, category.categoryId)
  }));

export const getAdjustedBudgetedFunds = (state) =>
  state.views.budgetView.categories.reduce((acc, category) => acc + category.currentLimit, 0);

export const getNewCategory = (state) =>
  state.views.actionView.category;
