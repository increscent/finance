import { SET_BUDGETS, SET_TRANSACTIONS } from './Actions.js';

export function financeApp(state, action) {
  switch (action.type) {
    case SET_BUDGETS:
      return Object.assign({}, state, {budgets: action.data});
    case SET_TRANSACTIONS:
      return Object.assign({}, state, {transactions: action.data});
    default:
      return state;
  }
}
