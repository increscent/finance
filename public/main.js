import React from 'react';
import ReactDOM from 'react-dom';
import OverviewController from './controllers/overview_controller.js';
import HistoryController from './controllers/history_controller.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'overview'
    };

    this.overviewController = new OverviewController();
    this.historyController = new HistoryController();

    this.switchView = this.switchView.bind(this);
  }

  switchView(view) {
    this.setState({
      currentView: view
    });
  }

  render() {
    var view;
    switch (this.state.currentView) {
      case 'history':
        view = this.historyController.show();
        break;
      default:
        view = this.overviewController.show();
    }

    return (
      <div>
        <ViewSwitcher handleClick={this.switchView} />
        {view}
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
      </span>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// var overviewController = new OverviewController();
// updateDOM(overviewController.show());
//
// var historyController = new HistoryController();
// updateDOM(historyController.show());
