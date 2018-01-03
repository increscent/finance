import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { pushView } from './store/actions.js';
import ViewsContainer from './components/views/viewsContainer.js';
import BudgetSummary from './components/budgetSummary/budgetSummary.js';

ReactDOM.render(
  <Provider store={store}>
    <ViewsContainer />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(pushView(
  <BudgetSummary />,
  'None'
));
