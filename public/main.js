import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import OverviewController from './controllers/overview_controller.js';
import HistoryController from './controllers/history_controller.js';
import AddTransactionController from './controllers/add_transaction_controller.js';
import AddBudgetController from './controllers/add_budget_controller.js';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentView: 'addTransaction'
//     };
//
//     this.switchView = this.switchView.bind(this);
//   }
//
//   switchView(view) {
//     this.setState({
//       currentView: view
//     });
//   }
//
//   render() {
//     return (
//       <div>
//         <ViewSwitcher handleClick={this.switchView} />
//         <OverviewController isVisible={this.state.currentView == 'overview'} />
//         <HistoryController isVisible={this.state.currentView == 'history'} />
//         <AddTransactionController isVisible={this.state.currentView == 'addTransaction'} />
//         <AddBudgetController isVisible={this.state.currentView == 'addBudget'} />
//       </div>
//     );
//   }
// }

function App(props) {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Overview</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/addTransaction">Add Transaction</Link></li>
          <li><Link to="/addBudget">Add Budget</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={OverviewController}/>
        <Route path="/history" component={HistoryController}/>
        <Route path="/addTransaction" component={AddTransactionController}/>
        <Route path="/addBudget" component={AddBudgetController}/>
      </div>
    </Router>
  );
}

// class ViewSwitcher extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (
//       <span>
//         <a href="#" onClick={() => this.props.handleClick('overview')} value="overview">Overview</a>
//         &nbsp;
//         <a href="#" onClick={() => this.props.handleClick('history')} value="history">History</a>
//         &nbsp;
//         <a href="#" onClick={() => this.props.handleClick('addTransaction')} value="addTransaction">Add Transaction</a>
//         &nbsp;
//         <a href="#" onClick={() => this.props.handleClick('addBudget')} value="addBudget">Add Budget</a>
//       </span>
//     );
//   }
// }

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
