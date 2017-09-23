import React from 'react';
import Helpers from '../../Helpers.js';

export default function BudgetControls(props) {
  let budget = props.budget;

  return (
    <div className="row no-padding">
      {
        (budget.name != 'Other' && budget.name != 'Total')?
        <div className="col-2 cell-padding div-button" onClick={budget.onEditBudget}>
            <span className="oi oi-pencil"></span>
        </div>
        :
        <div className="col-2 cell-padding"></div>
      }
      <div className="col-5 cell-padding">
        Start: {Helpers.readableAmount(budget.credits)}
      </div>
      <div className="col-5 cell-padding">
        Spent: {Helpers.readableAmount(budget.debits)}
      </div>
    </div>
  );
}
