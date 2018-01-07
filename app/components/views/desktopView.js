import React from 'react';
import BudgetViewContainer from './budgetView/budgetViewContainer.js';
import CategoryViewContainer from './categoryView/categoryViewContainer.js';
import ActionViewContainer from './actionView/actionViewContainer.js';

export default (props) => (
  <span id="views">
    {props.views.budgetView && <BudgetViewContainer />}
    {props.views.categoryView && <CategoryViewContainer />}
    {props.views.actionView && <ActionViewContainer />}
  </span>
);
