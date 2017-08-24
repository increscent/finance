import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import OverviewController from './controllers/overview_controller.js';
import HistoryController from './controllers/history_controller.js';
import AddTransactionController from './controllers/add_transaction_controller.js';
import AddBudgetController from './controllers/add_budget_controller.js';

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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
