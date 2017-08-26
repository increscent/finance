import React from 'react';
import ReactDOM from 'react-dom';
import TransactionService from '../services/transaction_service.js';

export default class History extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    this.transactionServiceListenerId = TransactionService.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    TransactionService.unRegisterListener(this.transactionServiceListenerId);
  }

  render() {
    TransactionService.readableDebits.forEach(x => x.type = 'debit');
    TransactionService.credits.forEach(x => x.type = 'credit');
    return (
      <table>
        <HistoryTableHeader />
        <tbody>
          {
            TransactionService.readableDebits.concat(TransactionService.credits).map((transaction, i) => {
              return <HistoryRow key={i} transaction={transaction}/>
            })
          }
        </tbody>
      </table>
    );
  }
}

function HistoryRow(props) {
  var transaction = props.transaction;
  var isDebit = transaction.type == 'debit';
  return (
    <tr>
      <td><span className="oi oi-x" onClick={() => TransactionService.deleteTransaction(transaction)}></span></td>
      <td>{transaction.category}</td>
      <td style={{color: isDebit?"red":"black"}}>${transaction.amount}</td>
      <td>{(new Date(transaction.date)).toDateString()}</td>
      <td>{transaction.motive}</td>
    </tr>
  );
}

function HistoryTableHeader(props) {
  return (
    <thead>
      <tr>
        <th></th>
        <th>Category</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Note</th>
      </tr>
    </thead>
  );
}
