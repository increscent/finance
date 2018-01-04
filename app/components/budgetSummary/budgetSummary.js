import React from 'react';
import { prettyAmount } from '../shared/converters.js';

export default (props) => (
  <div className="budget-summary">
    <div className="summary-row">
      Balance: ${prettyAmount(props.totalCredits)} - ${prettyAmount(props.totalDebits)} =
        ${prettyAmount(props.totalCredits - props.totalDebits)}
    </div>
    <div className="summary-row">
      Unbudgeted funds: ${prettyAmount(props.totalCredits - props.totalBudgetedFunds)}
    </div>
    <span className="link-button" onClick={props.addCategory}>
      add category
    </span>
    <span className="link-button" onClick={props.addTransaction}>
      add transaction
    </span>
    {!props.isAdjusting && <span className="link-button"
      onClick={props.adjustCategories}>
      adjust budget
    </span>}
  </div>
);
