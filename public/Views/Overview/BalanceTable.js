import React from 'react';
import AnalysisService from '../../Services/AnalysisService.js';
import BudgetService from '../../Services/BudgetService.js';
import TransactionService from '../../Services/TransactionService.js';
import BalanceTableHeader from './BalanceTableHeader.js';
import BalanceCard from './BalanceCard.js';
import {withRouter} from 'react-router-dom';
import Helpers from '../Helpers.js';

class BalanceTable extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
    this.handleEditBudget = this.handleEditBudget.bind(this);
    this.handleNewTransaction = this.handleNewTransaction.bind(this);
  }

  componentDidMount() {
    this.analysisServiceListenerId = AnalysisService.registerListener(this.forceUpdate);
    this.budgetServiceListenerId = BudgetService.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    AnalysisService.unRegisterListener(this.analysisServiceListenerId);
    BudgetService.unRegisterListener(this.budgetServiceListenerId);
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
          AnalysisService.overview.map((budget) => {
            budget.transactions = TransactionService.getDebitTransactionsForBudget(budget);
            budget.onEditBudget = () => this.handleEditBudget(budget);
            budget.onNewTransaction = () => this.handleNewTransaction(budget);
            budget.pretty_name = BudgetService.prettifyBudgetName(budget.name);
            return <BalanceCard key={budget.name} budget={budget}/>
          })
        }
      </div>
    );
  }
}

export default withRouter(BalanceTable);
