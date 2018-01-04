import budgetViewReducer from './budgetViewReducer.js';
import categoryViewReducer from './categoryViewReducer.js';
import actionViewReducer from './actionViewReducer.js';

export default (state = {}, action, globalState) => ({
  budgetView: budgetViewReducer(state.budgetView, action, globalState),
  categoryView: categoryViewReducer(state.categoryView, action, globalState),
  actionView: actionViewReducer(state.actionView, action, globalState)
});
