import React from 'react';

export default function HistoryRow(props) {
  var transaction = props.transaction;
  var isDebit = transaction.to == '@Debit';
  return (
    <tr>
      <td><span className="oi oi-circle-x" onClick={() => props.onDeleteTransaction(transaction)}></span></td>
      <td>{isDebit? transaction.from : 'Credit'}</td>
      <td>{isDebit?'-':'+'} ${transaction.amount}</td>
      <td>{(new Date(transaction.date)).toDateString()}</td>
      <td>{transaction.motive}</td>
    </tr>
  );
};
