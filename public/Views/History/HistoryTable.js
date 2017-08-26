import React from 'react';
import TransactionService from '../../Services/TransactionService.js';
import HistoryTableHeader from './HistoryTableHeader.js';
import HistoryRow from './HistoryRow.js';

export default class HistoryTable extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
    this.handleTransactionDelete = this.handleTransactionDelete.bind(this);
  }

  componentDidMount() {
    this.transactionServiceListenerId = TransactionService.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    TransactionService.unRegisterListener(this.transactionServiceListenerId);
  }

  handleTransactionDelete(transaction) {
    TransactionService.deleteTransaction(transaction);
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
              return <HistoryRow key={i} transaction={transaction} onDeleteTransaction={this.handleTransactionDelete}/>
            })
          }
        </tbody>
      </table>
    );
  }
}
