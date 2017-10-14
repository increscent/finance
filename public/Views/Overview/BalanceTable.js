import React from 'react';
import BalanceTableHeader from './BalanceTableHeader.js';
import BalanceCard from './BalanceCard.js';
import {withRouter} from 'react-router-dom';
import Helpers from '../../Helpers.js';
import Store from "../../Store.js";

class BalanceTable extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
    this.handleEditBudget = this.handleEditBudget.bind(this);
    this.handleNewTransaction = this.handleNewTransaction.bind(this);
  }

  componentDidMount() {
    this.storeListenerId = Store.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    Store.unRegisterListener(this.storeListenerId);
  }

  handleEditBudget(budget) {
    this.props.history.push('/editBudget/' + Helpers.encodeURIParam(budget.name));
  }

  handleNewTransaction(budget) {
    this.props.history.push('/addTransaction/' + Helpers.encodeURIParam(budget.name));
  }

  render() {
    return (
      <div id="accordion" role="tablist">
        {
          Store.overview.map((budget) => {
            budget.transactions = Store.getDebitTransactionsForBudget(budget);
            budget.onEditBudget = () => this.handleEditBudget(budget);
            budget.onNewTransaction = () => this.handleNewTransaction(budget);
            budget.safe_name = Helpers.generateSafeName(budget.name);
            if (budget.name == 'Total') budget.transactions = Store.getCreditTransactions();
            return <BalanceCard key={budget.name} budget={budget}/>
          })
        }
      </div>
    );
  }
}

export default withRouter(BalanceTable);
