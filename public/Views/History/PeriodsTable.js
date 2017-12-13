import React from 'react';
import {withRouter} from 'react-router-dom';
import PeriodRow from './PeriodRow.js';
import Helpers from '../../Helpers.js';
import Store from "../../Store.js";

class BalanceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.newState();

    this.updateState = this.updateState.bind(this);
    this.setSelectedPeriod = this.setSelectedPeriod.bind(this);
  }

  componentDidMount() {
    this.storeListenerId = Store.registerListener(this.updateState);
  }

  componentWillUnmount() {
    Store.unRegisterListener(this.storeListenerId);
  }

  updateState() {
    this.setState(this.newState());
  }

  newState() {
    let sortedPeriods = Store.periods.sort(
      (a, b) => (new Date(a.start_date) > new Date(b.start_date) ? -1 : 1)
    );

    return {
      periods: sortedPeriods,
      selectedPeriod: Store.getSelectedPeriod()
    };
  }

  setSelectedPeriod(periodId) {
    Store.setSelectedPeriod(periodId);
  }

  render() {
    return (
      <ul id="periods-table">
        {
          this.state.periods.map(period => (
            <PeriodRow key={period._id}
              period={period}
              selected={this.state.selectedPeriod === period._id}
              clickHandler={() => this.setSelectedPeriod(period._id)} />
          ))
        }
      </ul>
    );
  }
}

export default withRouter(BalanceTable);
