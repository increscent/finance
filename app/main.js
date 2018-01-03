import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import ViewsContainer from './components/views/viewsContainer.js';
import Login from './components/login/login.js';
import { getRequest } from './store/api.js';

let cookieName = 'is-logged-in';
let i = document.cookie.indexOf(cookieName);
let cookieValue = document.cookie.substr(i + cookieName.length);
let isLoggedIn = cookieValue.startsWith('=true')? true:false;

ReactDOM.render(
  <Provider store={store}>
    {
      isLoggedIn?
        <ViewsContainer />
        :
        <Login />
    }
  </Provider>,
  document.getElementById('root')
);

import { setBudgetView, setCategoryView, setActionView,
  addTransactions, addCategories } from './store/actions.js';
// import { TRANSACTION_ADD } from './components/views/actionView/actionView.js';
// store.dispatch(setCategoryView(null, false, false));
// store.dispatch(setActionView(TRANSACTION_ADD));

if (isLoggedIn) {
  let accountPromise = getRequest('/api/account');

  accountPromise.then(account =>
    getRequest('/api/category?periodId=' + account.currentPeriodId))
  .then(categories => store.dispatch(addCategories(categories)))
  .catch(error => console.log(error));

  accountPromise.then(account =>
    getRequest('/api/transaction?periodId=' + account.currentPeriodId))
  .then(transactions => store.dispatch(addTransactions(transactions)))
  .catch(error => console.log(error));

  // getRequest('/api/category')
  //   .then(data => store.dispatch(addCategories(data)))
  //   .catch(error => console.log(error));
}
