import React from 'react';
import ReactDOM from 'react-dom';
import OverviewModel from '../models/overview_model.js';
import BalanceTable from '../views/overview_view.js';

export default class BaseController extends React.Component {
  constructor(props, Model, View) {
    super(props);
    this.Model = new Model();
    this.View = View;
    var _this = this;
    this.state = {
      Model: this.Model
    };

    // if (this.Model.FETCH_endpoint) {
    //   this.fetchModel();
    // }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchModel() {
    var request_options = {
      method: 'GET',
      headers: {'account_id': '598d3551f5468d246bb06fbb'}
    };

    fetch(this.Model.FETCH_endpoint, request_options)
    .then(res => {
      if (res.status == 200) return res.json();
      throw new Error('The model fetch failed.')
    })
    .then(data => {
      this.Model.update(data);
      if (this._isMounted) this.forceUpdate();
    })
    .catch(error => {
      console.log(error.toString());
    });
  }

  putRequest(endpoint, body) {
    var request_options = {
      method: 'PUT',
      headers: {'account_id': '598d3551f5468d246bb06fbb', 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return fetch(endpoint, request_options)
    .then(res => {
      if (res.status == 200) return res.text();
      throw new Error('Sorry, we had a server error. Please try again soon.')
    });
  }

  render() {
    return React.createElement(this.View, this.state.Model, null);
  }
}
