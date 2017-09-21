import React from 'react';
import TransactionList from '../Components/TransactionList.js';
import BudgetControls from './BudgetControls.js';

export default function BalanceCardBody(props) {
  let budget = props.budget;
  return (
    <div id={"collapse" + budget.name} className="collapse" role="tabpanel" aria-labelledby={'heading' + budget.name} data-parent="#accordion">
      <div className="card-body">
        <BudgetControls budget={budget} />
        <TransactionList transactions={budget.transactions} />
      </div>
    </div>
  );
}
