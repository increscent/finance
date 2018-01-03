import { combineReducers } from 'redux';
import account from './account.js';
import categories from './categories.js';
import transactions from './transactions.js';
import views from './views.js';

export default combineReducers({
  account,
  categories,
  transactions,
  views
});
