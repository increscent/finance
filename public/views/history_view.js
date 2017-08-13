import React from 'react';
import ReactDOM from 'react-dom';

export default class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Model: this.props.Model
    };
  }

  render() {
    return (
      <table>
        <HistoryTableHeader />
        <tbody>
          {
            this.state.Model.transactions.map((transaction, i) => {
              return <HistoryRow key={i} transaction={transaction}/>
            })
          }
        </tbody>
      </table>
    );
  }
}

class HistoryRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var transaction = this.props.transaction;
    var isDebit = transaction.type == 'debit';
    return (
      <tr>
        <td>{transaction.category}</td>
        <td style={{color: isDebit?"red":"black"}}>${transaction.amount}</td>
        <td>{(new Date(transaction.date)).toDateString()}</td>
        <td>{transaction.motive}</td>
      </tr>
    );
  }
}

function HistoryTableHeader(props) {
  return (
    <thead>
      <tr>
        <th>Category</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Note</th>
      </tr>
    </thead>
  );
}
