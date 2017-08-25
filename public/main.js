import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Overview from './views/overview_view.js';
import History from './views/history_view.js';
import AddTransaction from './views/add_transaction_view.js';
import AddBudget from './views/add_budget_view.js';

function App(props) {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/overview">Overview</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/addTransaction">Add Transaction</Link></li>
          <li><Link to="/addBudget">Add Budget</Link></li>
        </ul>

        <hr/>

        <Route path="/overview" component={Overview}/>
        <Route path="/history" component={History}/>
        <Route path="/addTransaction" component={AddTransaction}/>
        <Route path="/addBudget" component={AddBudget}/>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
