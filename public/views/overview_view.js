import React from 'react';
import ReactDOM from 'react-dom';
import AnalysisService from '../services/analysis_service.js';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    this.analysisServiceListenerId = AnalysisService.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    AnalysisService.unRegisterListener(this.analysisServiceListenerId);
  }

  render() {
    return (
      <table>
        <BalanceTableHeader />
        <tbody>
          {
            AnalysisService.overview.map((budget) => {
              return <BalanceRow key={budget.category} budget={budget}/>
            })
          }
        </tbody>
      </table>
    );
  }
}

class BalanceRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var budget = this.props.budget;
    return (
      <tr>
        <td>{budget.category} ({budget.category_allowance})</td>
        <td>{budget.allowance}</td>
        <td>{budget.debits}</td>
        <td>{budget.balance}</td>
      </tr>
    );
  }
}

function BalanceTableHeader(props) {
  return (
    <thead>
      <tr>
        <th>Category</th>
        <th>Allowance</th>
        <th>Spent</th>
        <th>Balance</th>
      </tr>
    </thead>
  );
}
