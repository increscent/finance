import React from 'react';

export default function BalanceRow(props) {
  var budget = props.budget;
  return (
    <tr>
      <td>{budget.category} ({budget.category_allowance})</td>
      <td>{budget.allowance}</td>
      <td>{budget.debits}</td>
      <td>{budget.balance}</td>
    </tr>
  );
}
