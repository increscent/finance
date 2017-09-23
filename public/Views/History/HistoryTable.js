import React from 'react';
import HistoryTableHeader from './HistoryTableHeader.js';
import HistoryRow from './HistoryRow.js';
import TransactionService from '../../Services/TransactionService.js';
import FormValidationMessages from '../Components/FormValidationMessages.js';
import {withRouter} from 'react-router-dom';

class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_messages: []
    };

    this.forceUpdate = this.forceUpdate.bind(this);
    this.handleEditTransaction = this.handleEditTransaction.bind(this);
  }

  componentDidMount() {
    this.transactionServiceListenerId = TransactionService.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    TransactionService.unRegisterListener(this.transactionServiceListenerId);
  }

  handleEditTransaction(transaction) {
    this.props.history.push('/editTransaction/' + transaction._id);
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <HistoryTableHeader />
          <tbody>
            {
              TransactionService.getTransactions()
              .sort((transactionA,transactionB) => {
                return (new Date(transactionA.date)) < (new Date(transactionB.date))? 1:-1;
              })
              .filter(x => x.from == '@Credit' || x.to == '@Debit')
              .map((transaction, i) => {
                return <HistoryRow key={i} transaction={transaction} onEditTransaction={this.handleEditTransaction}/>
              })
            }
          </tbody>
        </table>
        <FormValidationMessages validationMessages={this.state.validation_messages} />
      </div>
    );
  }
}

export default withRouter(HistoryTable);
