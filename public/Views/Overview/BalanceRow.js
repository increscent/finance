import React from 'react';

export default function BalanceRow(props) {
  var budget = props.budget;
  return (
    <tr>
      <td>{budget.name}</td>
      <td>{budget.credits}</td>
      <td>{budget.debits}</td>
      <td>{budget.balance}</td>
    </tr>
  );
}
