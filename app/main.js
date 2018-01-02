import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import ViewContainer from './components/viewContainer/viewContainer.js';
import CategoryList from './components/categoryList/categoryList.js';
import CategoryListAdjust from './components/categoryListAdjust/categoryListAdjust.js';
import CategorySummary from './components/categorySummary/categorySummary.js';
import CategorySummaryEdit from './components/categorySummaryEdit/categorySummaryEdit.js';
import BudgetSummary from './components/budgetSummary/budgetSummary.js';

function App(props) {
  return (
    <span style={{'display': 'flex', flexDirection: 'row'}}>
      <ViewContainer>
        <BudgetSummary />
        <CategoryList />
      </ViewContainer>
      <ViewContainer>
        <BudgetSummary />
        <CategoryListAdjust />
      </ViewContainer>
      <ViewContainer title="Food">
        <CategorySummary />
      </ViewContainer>
      <ViewContainer title="Food">
        <CategorySummaryEdit />
      </ViewContainer>
    </span>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
