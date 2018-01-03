import React from 'react';
import BudgetViewContainer from './budgetView/budgetViewContainer.js';
import CategoryViewContainer from './categoryView/categoryViewContainer.js';
import ActionViewContainer from './actionView/actionViewContainer.js';

export default (props) => (
  <span id="views">
    {
      (props.views.actionView && <ActionViewContainer />) ||
      (props.views.categoryView && <CategoryViewContainer />) ||
      (props.views.budgetView && <BudgetViewContainer />)
    }
  </span>
);
