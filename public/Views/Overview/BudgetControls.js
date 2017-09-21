import React from 'react';
import Helpers from '../Helpers.js';

export default function BudgetControls(props) {
  let budget = props.budget;

  return (
    <div className="row">
      <div className="col-2">
        {
          budget.name != 'Other' && budget.name != 'Total' &&
          <span className="oi oi-pencil" onClick={budget.onEditBudget}></span>
        }
      </div>
      <div className="col-5">
        Allowance: ${Helpers.round(budget.credits, 2)}
      </div>
      <div className="col-5">
        Spent: ${Helpers.round(budget.debits, 2)}
      </div>
    </div>
  );
}
