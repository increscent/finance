import React from 'react';
import ReactDOM from 'react-dom';
import OverviewModel from '../models/overview_model.js';
import BalanceTable from '../views/overview_view.js';
import BaseController from './base_controller.js';

export default class OverviewController extends BaseController {
  constructor(props) {
    super(props, OverviewModel, BalanceTable);
  //   this.Model = new OverviewModel();
  //   this.state = {
  //     budgets: this.Model.budgets
  //   };
  //
  //   this.fetchModel();
  // }
  //
  // fetchModel() {
  //   var request_options = {
  //     method: 'GET',
  //     headers: {'account_id': '598d3551f5468d246bb06fbb'}
  //   };
  //   fetch('/api/analysis/overview', request_options).then((res) => {
  //     if (res.status == 200) {
  //       res.json().then((data) => this.updateModel({budgets: data}));
  //     } else {
  //       res.text().then((error) => console.log(error));
  //     }
  //   });
  // }
  //
  // updateModel(model) {
  //   this.Model.updateBudgets(model.budgets);
  //   this.setState({
  //     budgets: this.Model.budgets
  //   });
  // }
  //
  // render() {
  //   return (
  //     <BalanceTable budgets={this.state.budgets} />
  //   );
  }
}
