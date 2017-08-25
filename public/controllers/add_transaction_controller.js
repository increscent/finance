import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";
import TransactionModel from '../models/transaction_model.js';
import TransactionService from '../services/transaction_service.js';
import AddTransactionForm from '../views/add_transaction_view.js';
import BaseController from './base_controller.js';

class AddTransactionController extends BaseController {
  constructor(props) {
    super(props, TransactionModel, AddTransactionForm);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Model = TransactionService;
    this.Model.onFormSubmit = this.handleFormSubmit;
    TransactionService.update(() => console.log(this.Model));
  }

  handleFormSubmit(transaction, error_callback) {
    this.putRequest('/api/transaction/' + transaction.transaction_type, transaction)
    .then(data => {
      this.props.history.push('/overview');
    })
    .catch(error => {
      error_callback(error.toString());
    });
  }
}

export default withRouter(AddTransactionController);
