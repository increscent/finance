import React from 'react';
import Helpers from '../../Helpers.js';

export default function TransactionListItem(props) {
  let transaction = props.transaction;

  return (
    <div className="row no-padding transaction-list-item">
      <div className="col-3 cell-padding">
        {Helpers.readableDate(transaction.date)}
      </div>
      <div className="col-3 cell-padding">
        ${Helpers.round(transaction.amount, 2)}
      </div>
      <div className="col-6 cell-padding">
        {transaction.motive}
      </div>
    </div>
  );
}
