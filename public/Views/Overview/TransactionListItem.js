import React from 'react';
import Helpers from '../../Helpers.js';

export default function TransactionListItem(props) {
  let transaction = props.transaction;

  return (
    <div className="row no-padding transaction-list-item" onClick={() => props.history.push('/editTransaction/' + transaction._id)}>
      <div className="col-3 cell-padding">
        {Helpers.readableDate(transaction.date)}
      </div>
      <div className="col-3 cell-padding">
        ${Helpers.round(transaction.amount, 2)}
      </div>
      <div className="col-6 ml-auto mr-auto cell-padding">
        {transaction.motive}
      </div>
    </div>
  );
}
