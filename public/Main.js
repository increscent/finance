import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import OverviewView from './Views/Overview/OverviewView.js';
import HistoryView from './Views/History/HistoryView.js';
import AddTransactionView from './Views/AddTransaction/AddTransactionView.js';
import AddBudgetView from './Views/AddBudget/AddBudgetView.js';
import EditBudgetView from './Views/EditBudget/EditBudgetView.js';
import EditTransactionView from './Views/EditTransaction/EditTransactionView.js';
import LoginView from './Views/Login/LoginView.js';
import Store from './Store.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { financeApp } from './Store/Reducers.js';
import { fetchBudgets } from './Store/Actions.js';

function App(props) {
  return (
    <Router>
    {
      Store.isLoggedIn()?
      <div>
        <Route path='/(|overview)/' component={OverviewView}/>
        <Route path='/history' component={HistoryView}/>
        <Route path='/addTransaction/:from?' component={AddTransactionView}/>
        <Route path='/addBudget' component={AddBudgetView}/>
        <Route path='/editBudget/:name?' component={EditBudgetView}/>
        <Route path='/editTransaction/:id?' component={EditTransactionView}/>
      </div>
      :
      <div>
        <Route path='*' component={LoginView}/>
      </div>
    }
    </Router>
  );
}

let store = createStore(financeApp);

fetchBudgets();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
