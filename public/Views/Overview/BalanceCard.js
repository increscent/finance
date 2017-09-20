import React from 'react';
import BudgetService from '../../Services/BudgetService.js';
import ClassNames from 'classnames';
import BalanceCardHeader from './BalanceCardHeader.js';
import BalanceCardBlock from './BalanceCardBlock.js';

export default function BalanceCard(props) {
  var budget = props.budget;
  var balanceClass = ClassNames({deficit: budget.balance < 0, surplus: budget.balance >= 0});
  return (
    <div className="card">
      <BalanceCardHeader budget={budget} />
      <BalanceCardBlock budget={budget} />
    </div>
  );

  // <tr>
  //   <td>
  //     {
  //       budget.name != 'Other' && budget.name != 'Total' &&
  //       <span className="oi oi-pencil" onClick={() => props.onEditBudget(budget)}></span>
  //     }
  //   </td>
  //   <td>{BudgetService.prettifyBudgetName(budget.name)}</td>
  //   <td>{budget.credits}</td>
  //   <td>{budget.debits}</td>
  //   <td className={balanceClass}>{budget.balance}</td>
  // </tr>
}
