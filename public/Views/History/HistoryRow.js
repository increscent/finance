import React from 'react';

export default function HistoryRow(props) {
  var transaction = props.transaction;
  var isDebit = transaction.type == 'debit';
  return (
    <tr>
      <td><span className="oi oi-x" onClick={() => props.onDeleteTransaction(transaction)}></span></td>
      <td>{transaction.category}</td>
      <td style={{color: isDebit?"red":"black"}}>${transaction.amount}</td>
      <td>{(new Date(transaction.date)).toDateString()}</td>
      <td>{transaction.motive}</td>
    </tr>
  );
};
