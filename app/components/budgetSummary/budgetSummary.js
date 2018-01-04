import React from 'react';

export default (props) => (
  <div className="budget-summary">
    <div className="summary-row">
      Balance: ${props.totalCredits} - ${props.totalDebits} =
        ${props.totalCredits - props.totalDebits}
    </div>
    <div className="summary-row">
      Unbudgeted funds: ${props.totalCredits - props.totalBudgetedFunds}
    </div>
    <span className="link-button" onClick={props.addCategory}>
      add category
    </span>
    <span className="link-button" onClick={props.addTransaction}>
      add transaction
    </span>
    <span className="link-button"
      onClick={() => props.adjustCategories(props.categories)}>
      adjust budget
    </span>
  </div>
);
