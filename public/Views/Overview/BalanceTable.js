import React from 'react';
import AnalysisService from '../../Services/AnalysisService.js';
import BudgetService from '../../Services/BudgetService.js';
import BalanceTableHeader from './BalanceTableHeader.js';
import BalanceRow from './BalanceRow.js';
import {withRouter} from 'react-router-dom';

class BalanceTable extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
    this.handleEditBudget = this.handleEditBudget.bind(this);
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
    this.props.history.push('/editBudget/' + encodeURI(budget.name).replace('/', '%2F'));
  }

  render() {
    return (
      <table className="table">
        <BalanceTableHeader />
        <tbody>
          {
            AnalysisService.overview.map((budget) => {
              return <BalanceRow key={budget.name} budget={budget} onEditBudget={this.handleEditBudget}/>
            })
          }
        </tbody>
      </table>
    );
  }
}

export default withRouter(BalanceTable);
