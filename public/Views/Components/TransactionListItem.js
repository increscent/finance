import React from 'react';
import Helpers from '../Helpers.js';

export default function TransactionListItem(props) {
  let transaction = props.transaction;

  return (
    <div className="row">
      <div className="col-3">
        ${Helpers.round(transaction.amount, 2)}
      </div>
      <div className="col-3">
        {Helpers.readableDate(transaction.date)}
      </div>
      <div className="col-6">
        {transaction.motive}
      </div>
    </div>
  );
}
