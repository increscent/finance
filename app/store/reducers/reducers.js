import accountReducer from './accountReducer.js';
import categoriesReducer from './categoriesReducer.js';
import transactionsReducer from './transactionsReducer.js';
import viewsReducer from './viewsReducer.js';

// const defaultState = {
//   account: {
//     isLoggedIn: false
//   },
//   categories: [],
//   transactions: [],
//   views: {
//     budgetView: {
//       isAdjusting: false
//     }
//   }
// }

export default (state = {}, action) => {
  return {
    account: accountReducer(state.account, action, state),
    categories: categoriesReducer(state.categories, action, state),
    transactions: transactionsReducer(state.transactions, action, state),
    views: viewsReducer(state.views, action, state)
  };
};
