import React from 'react';
import Helpers from '../../Helpers.js';

export default function TransactionListItem(props) {
  let transaction = props.transaction;

  return (
    <div className="row">
      <div className="col-3 no-padding">
        ${Helpers.round(transaction.amount, 2)}
      </div>
      <div className="col-3 no-padding">
        {Helpers.readableDate(transaction.date)}
      </div>
      <div className="col-6 no-padding">
        {transaction.motive}
      </div>
    </div>
  );
}
