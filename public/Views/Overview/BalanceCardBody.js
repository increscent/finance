import React from 'react';
import TransactionList from '../Components/TransactionList.js';
import BudgetControls from './BudgetControls.js';

export default function BalanceCardBody(props) {
  let budget = props.budget;
  return (
    <div id={"collapse" + budget.safe_name} className="collapse" role="tabpanel" aria-labelledby={'heading' + budget.safe_name} data-parent="#accordion">
      <div className="card-body no-padding">
        <BudgetControls budget={budget} />
        <TransactionList transactions={budget.transactions} />
      </div>
    </div>
  );
}
