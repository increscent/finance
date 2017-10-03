import React from 'react';
import TransactionList from './TransactionList.js';
import BudgetControls from './BudgetControls.js';

export default function BalanceCardBody(props) {
  let budget = props.budget;
  return (
    <div id={"collapse" + budget.safe_name} className="collapse" role="tabpanel" aria-labelledby={'heading' + budget.safe_name} data-parent="#accordion">
      <div className="card-body no-padding">
        <BudgetControls budget={budget} />
        {
          (budget.transactions.length > 0)&&
          <span>Transactions:</span>
        }
        <TransactionList transactions={budget.transactions} />
      </div>
    </div>
  );
}
