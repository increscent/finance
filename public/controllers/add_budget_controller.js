import React from 'react';
import ReactDOM from 'react-dom';
import TransactionModel from '../models/transaction_model.js';
import AddBudgetForm from '../views/add_budget_view.js';
import BaseController from './base_controller.js';

export default class AddBudgetController extends BaseController {
  constructor(props) {
    super(props, TransactionModel, AddBudgetForm);

    // this.Model.handleFormSubmit = this.handleFormSubmit;
  }

  // handleFormSubmit(formState) {
  // }
}
