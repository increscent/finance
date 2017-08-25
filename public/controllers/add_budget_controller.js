import React from 'react';
import ReactDOM from 'react-dom';
import TransactionModel from '../models/transaction_model.js';
import AddBudgetForm from '../views/add_budget_view.js';
import BaseController from './base_controller.js';

export default class AddBudgetController extends BaseController {
  constructor(props) {
    super(props, TransactionModel, AddBudgetForm);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Model.onFormSubmit = this.handleFormSubmit;
  }

  handleFormSubmit(budget, error_callback) {
    this.putRequest('/api/budget', budget)
    .then(data => {
      this.props.history.push('/overview');
    })
    .catch(error => {
      error_callback(error.toString());
    });
  }
}
