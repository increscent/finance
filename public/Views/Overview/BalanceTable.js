import React from 'react';
import AnalysisService from '../../Services/AnalysisService.js';
import BalanceTableHeader from './BalanceTableHeader.js';
import BalanceRow from './BalanceRow.js';

export default class BalanceTable extends React.Component {
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
      <table className="table">
        <BalanceTableHeader />
        <tbody>
          {
            AnalysisService.overview.map((budget) => {
              return <BalanceRow key={budget.name} budget={budget}/>
            })
          }
        </tbody>
      </table>
    );
  }
}
