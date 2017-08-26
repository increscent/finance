import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import OverviewView from './Views/Overview/OverviewView.js';
import HistoryView from './Views/History/HistoryView.js';
import AddTransactionView from './Views/AddTransaction/AddTransactionView.js';
import AddBudgetView from './Views/AddBudget/AddBudgetView.js';

function App(props) {
  return (
    <Router>
      <div>
        <Route path="/:path(overview|)" component={OverviewView}/>
        <Route path="/history" component={HistoryView}/>
        <Route path="/addTransaction" component={AddTransactionView}/>
        <Route path="/addBudget" component={AddBudgetView}/>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
