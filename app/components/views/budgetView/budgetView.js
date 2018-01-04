import React from 'react';
import ViewHolder from '../../viewHolder/viewHolder.js';
import BudgetSummaryContainer from '../../budgetSummary/budgetSummaryContainer.js';
import CategoryListContainer from '../../categoryList/categoryListContainer.js';
import CategoryListAdjustContainer from '../../categoryListAdjust/categoryListAdjustContainer.js';

export default (props) => (
  <ViewHolder>
    <BudgetSummaryContainer />
    {
      props.isAdjusting?
        <CategoryListAdjustContainer />
        :
        <CategoryListContainer />
    }
  </ViewHolder>
);
