import React from 'react';
import ReactDOM from 'react-dom';
import AddTransactionModel from '../models/add_transaction_model.js';
import AddTransactionForm from '../views/add_transaction_view.js';
import BaseController from './base_controller.js';

export default class AddTransactionController extends BaseController {
  constructor(props) {
    super(props, AddTransactionModel, AddTransactionForm);

    // this.Model.handleFormSubmit = this.handleFormSubmit;
  }

  // handleFormSubmit(formState) {
  // }
}
