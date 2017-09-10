import React from 'react';
import BudgetService from '../../Services/BudgetService.js';

export default function BalanceRow(props) {
  var budget = props.budget;
  return (
    <tr>
      <td>
        {
          budget.name != 'Other' && budget.name != 'Total' &&
          <span className="oi oi-pencil" onClick={() => props.onEditBudget(budget)}></span>
        }
      </td>
      <td>{BudgetService.prettifyBudgetName(budget.name)}</td>
      <td>{budget.credits}</td>
      <td>{budget.debits}</td>
      <td>{budget.balance}</td>
    </tr>
  );
}
