import React from 'react';
import AddTransactionForm from '../AddTransaction/AddTransactionForm.js';
import BackNav from '../Components/BackNav.js';
import TransactionService from '../../Services/TransactionService.js';

export default class EditTransactionView extends React.Component {
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
    let id = this.props.match.params.id;
    let transaction = TransactionService.getTransactions().find(x => x._id == id);
    return (
      <div>
        <BackNav title={"Edit Transaction"} />
          <div className="container">
            {
              transaction? // transaction must be set in order to edit it
              <AddTransactionForm uri={transaction._id} from={transaction.from} to={transaction.to} amount={transaction.amount} motive={transaction.motive} />
              :
              <div className="alert alert-warning" role="alert">
                The specified transaction was not found :(
              </div>
            }

          </div>
      </div>
    );
  }
}
