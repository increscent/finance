import React from 'react';
import HistoryTableHeader from './HistoryTableHeader.js';
import HistoryRow from './HistoryRow.js';
import TransactionService from '../../Services/TransactionService.js';
import FormValidationMessages from '../Components/FormValidationMessages.js';

export default class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_messages: []
    };

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
    TransactionService.deleteTransaction(transaction)
    .catch(error => {
      this.setState({
        validation_messages: [error.toString()]
      });
    });
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <HistoryTableHeader />
          <tbody>
            {
              TransactionService.getTransactions()
              .filter(x => x.from == '@Credit' || x.to == '@Debit')
              .map((transaction, i) => {
                return <HistoryRow key={i} transaction={transaction} onDeleteTransaction={this.handleTransactionDelete}/>
              })
            }
          </tbody>
        </table>
        <FormValidationMessages validationMessages={this.state.validation_messages} />
      </div>
    );
  }
}
