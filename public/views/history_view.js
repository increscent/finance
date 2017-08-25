import React from 'react';
import ReactDOM from 'react-dom';
import AnalysisService from '../services/analysis_service.js';

export default class History extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
    AnalysisService.updateHistory();
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
        <HistoryTableHeader />
        <tbody>
          {
            AnalysisService.history.map((transaction, i) => {
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
