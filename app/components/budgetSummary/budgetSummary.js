import React from 'react';
import { prettyAmount } from '../shared/converters.js';

export default (props) => (
  <div className="budget-summary">
    <div className="logout-row">
      <a className="link-button" onClick={() => window.location.href = '/logout'}>logout</a>
    </div>
    <div className="summary-row">
      Balance: ${prettyAmount(props.totalCredits)} - ${prettyAmount(props.totalDebits)} =
        ${prettyAmount(props.totalCredits - props.totalDebits)}
    </div>
    <div className="summary-row">
      Unbudgeted funds: ${prettyAmount(props.totalCredits - props.totalBudgetedFunds)}
    </div>
    <span className="link-button" onClick={props.addCategory}>
      + category
    </span>
    <span className="link-button" onClick={props.addTransaction}>
      + transaction
    </span>
    {!props.isAdjusting && <span className="link-button"
      onClick={props.adjustCategories}>
      adjust budget
    </span>}
  </div>
);
