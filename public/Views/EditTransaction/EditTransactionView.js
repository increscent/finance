import React from 'react';
import AddTransactionForm from '../AddTransaction/AddTransactionForm.js';
import BackNav from '../Components/BackNav.js';
import Store from "../../Store.js";

export default class EditTransactionView extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    this.storeListenerId = Store.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    Store.unRegisterListener(this.storeListenerId);
  }

  render() {
    let id = this.props.match.params.id;
    let transaction = Store.transactions.find(x => x._id == id);
    return (
      <div>
        <BackNav title={"Edit Transaction"} />
          <div className="container">
            {
              transaction? // transaction must be set in order to edit it
              <AddTransactionForm uri={transaction._id} from={transaction.from} to={transaction.to} amount={transaction.amount} motive={transaction.motive} transaction_type={transaction.to == '@Debit'?'debit':'credit'} />
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
