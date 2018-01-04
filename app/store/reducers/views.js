import { combineReducers } from 'redux';
import budgetView from './budgetView.js';
import categoryView from './categoryView.js';
import actionView from './actionView.js';

export default combineReducers({
  budgetView,
  categoryView,
  actionView
});
