import React from 'react';
import ReactDOM from 'react-dom';
import HistoryModel from '../models/history_model.js';
import HistoryTable from '../views/history_view.js';

export default class HistoryController {
  constructor() {
    this.Model = new HistoryModel();
    this.ViewElement = <HistoryTable Model={this.Model} ref={instance => {this.View = instance}} />;
    this.fetchModel();
  }

  fetchModel() {
    var request_options = {
      method: 'GET',
      headers: {'account_id': '598d3551f5468d246bb06fbb'}
    };
    fetch('/api/analysis/history', request_options).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => this.updateModel({transactions: data}));
      } else {
        res.text().then((error) => console.log(error));
      }
    });
  }

  updateModel(model) {
    this.Model.updateTransactions(model.transactions);
    if (this.View) this.View.updateModel(this.Model);
  }

  show() {
    return this.ViewElement;
  }
}
