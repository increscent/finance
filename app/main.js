import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { initData } from './store/data.js';
import ViewsContainer from './components/views/viewsContainer.js';
import Login from './components/login/login.js';

initData(store);

ReactDOM.render(
  <Provider store={store}>
    {
      store.getState().account.isLoggedIn?
        <ViewsContainer />
        :
        <Login />
    }
  </Provider>,
  document.getElementById('root')
);
