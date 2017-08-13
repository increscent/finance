import React from 'react';
import ReactDOM from 'react-dom';
import OverviewModel from '../models/overview_model.js';
import BalanceTable from '../views/overview_view.js';

export default class OverviewController {
  constructor() {
    this.Model = new OverviewModel();
    this.ViewElement = <BalanceTable Model={this.Model} ref={instance => {this.View = instance}} />;
    this.fetchModel();
  }

  fetchModel() {
    var request_options = {
      method: 'GET',
      headers: {'account_id': '598d3551f5468d246bb06fbb'}
    };
    fetch('/api/analysis/overview', request_options).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => this.updateModel({budgets: data}));
      } else {
        res.text().then((error) => console.log(error));
      }
    });
  }

  updateModel(model) {
    this.Model.updateBudgets(model.budgets);
    if (this.View) this.View.forceUpdate();
  }

  show() {
    return this.ViewElement;
  }
}
