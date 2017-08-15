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

    if (this.Model.FETCH_endpoint) {
      this.fetchModel();
    }
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

    fetch(this.Model.FETCH_endpoint, request_options).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          this.Model.update(data);
          if (this._isMounted) {
            this.setState({
              Model: this.Model
            });
          }
        });
      } else {
        res.text().then((error) => console.log(error));
      }
    });
  }

  render() {
    if (this.props.isVisible) {
      return React.createElement(this.View, this.state.Model, null);
    } else {
      return null;
    }
  }
}
