import React from 'react';
import ViewHolder from '../../viewHolder/viewHolder.js';
import BudgetSummary from '../../budgetSummary/budgetSummary.js';
import CategoryList from '../../categoryList/categoryList.js';
import CategoryListAdjust from '../../categoryListAdjust/categoryListAdjust.js';

export default (props) => (
  <ViewHolder>
    <BudgetSummary />
    {
      props.isAdjusting?
        <CategoryListAdjust />
        :
        <CategoryList />
    }
  </ViewHolder>
);
