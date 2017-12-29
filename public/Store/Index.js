import { createStore } from 'redux';
import { financeApp } from './Reducers.js';
import { fetchBudgets, fetchTransactions } from './Actions.js';

let store = createStore(financeApp, {
  budgets: [],
  transactions: []
});

fetchBudgets(store.dispatch);
fetchTransactions(store.dispatch);

export default store;
