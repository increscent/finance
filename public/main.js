import React from 'react';
import ReactDOM from 'react-dom';
import OverviewController from './controllers/overview_controller.js';
import HistoryController from './controllers/history_controller.js';
import AddTransactionController from './controllers/add_transaction_controller.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'addTransaction'
    };

    this.switchView = this.switchView.bind(this);
  }

  switchView(view) {
    this.setState({
      currentView: view
    });
  }

  render() {
    return (
      <div>
        <ViewSwitcher handleClick={this.switchView} />
        <OverviewController isVisible={this.state.currentView == 'overview'} />
        <HistoryController isVisible={this.state.currentView == 'history'} />
        <AddTransactionController isVisible={this.state.currentView == 'addTransaction'} />
      </div>
    );
  }
}

class ViewSwitcher extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <a href="#" onClick={() => this.props.handleClick('overview')} value="overview">Overview</a>
        &nbsp;
        <a href="#" onClick={() => this.props.handleClick('history')} value="history">History</a>
        &nbsp;
        <a href="#" onClick={() => this.props.handleClick('addTransaction')} value="addTransaction">Add Transaction</a>
      </span>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
