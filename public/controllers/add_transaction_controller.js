import React from 'react';
import ReactDOM from 'react-dom';
import TransactionModel from '../models/transaction_model.js';
import AddTransactionForm from '../views/add_transaction_view.js';
import BaseController from './base_controller.js';

export default class AddTransactionController extends BaseController {
  constructor(props) {
    super(props, TransactionModel, AddTransactionForm);

    // this.Model.handleFormSubmit = this.handleFormSubmit;
  }

  // handleFormSubmit(formState) {
  // }
}
