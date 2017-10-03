import React from 'react';
import TransactionListItem from './TransactionListItem.js';
import {withRouter} from 'react-router-dom';

function TransactionList(props) {

  return (
    <div className="container no-padding">
      {props.transactions.map((transaction, i) => {
        return <TransactionListItem key={i} transaction={transaction} editable={props.editable} showBudget={props.showBudget} history={props.history} />
      })}
    </div>
  );
}

export default withRouter(TransactionList);
