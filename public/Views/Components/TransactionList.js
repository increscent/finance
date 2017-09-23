import React from 'react';
import TransactionListItem from './TransactionListItem.js';

export default function TransactionList(props) {
  return (
    <div className="container no-padding">
      {props.transactions.map((transaction, i) => {
        return <TransactionListItem key={i} transaction={transaction} />
      })}
    </div>
  );
}
