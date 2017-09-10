import React from 'react';
import {withRouter} from "react-router-dom";
import BudgetService from '../../Services/BudgetService.js';
import TransactionService from '../../Services/TransactionService.js';
import BudgetSelect from './BudgetSelect.js';
import Form from '../Components/Form.js';
import FormValidationMessages from '../Components/FormValidationMessages.js';
import mixin from 'mixin';
import DebitCreditRadioButtons from './DebitCreditRadioButtons.js';

class AddTransactionForm extends mixin(Form, React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      transaction_type: 'debit',
      from: this.getDefaultFrom(),
      to: '@Debit',
      motive: '',
      amount: '',
      validation_messages: []
    };

    this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
    this.setDefaultFrom = this.setDefaultFrom.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  setDefaultFrom() {
    if (this.state.from) return;
    this.setState({
      from: this.getDefaultFrom()
    });
  }

  componentDidMount() {
    this.transactionServiceListenerId = TransactionService.registerListener(this.setDefaultFrom);
  }

  componentWillUnmount() {
    TransactionService.unRegisterListener(this.transactionServiceListenerId);
  }

  getDefaultFrom() {
    return BudgetService.getBudgets()[0]? BudgetService.getBudgets()[0].name : '';
  }

  handleTransactionTypeChange(transaction_type) {
    var from = '@Credit';
    var to = 'Other';
    if (transaction_type == 'debit') {
      var from = this.getDefaultFrom();
      var to = '@Debit';
    }
    this.setState({
      transaction_type: transaction_type,
      from: from,
      to: to
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var rules = [
      {name: 'transaction_type', validate: (x) => x == 'debit' || x == 'credit', error_message: 'Please select a transaction type.'},
      {name: 'from', validate: (x) => x, error_message: 'Please select a category.'},
      {name: 'motive', validate: (x) => true, error_message: 'It doesn\'t matter what note you write.'},
      {name: 'amount', validate: (x) => parseFloat(x), error_message: 'Please enter a valid amount.'},
      {name: 'amount', validate: (x) => parseFloat(x) && parseFloat(x) > 0, error_message: 'Transaction amount must be a positive number.'}
    ];

    var error_messages = this.validateFormInput(rules);
    this.setState({
      validation_messages: error_messages
    });

    if (!error_messages.length) {
      // validation successful
      TransactionService.addTransaction({
        from: this.state.from,
        to: this.state.to,
        motive: this.state.motive.trim(),
        amount: parseFloat(this.state.amount)
      })
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => {
        this.setState({
          validation_messages: [error.toString()]
        })
      });
    }
  }

  render() {
    return (
      <form id="addTransactionForm" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <DebitCreditRadioButtons transaction_type={this.state.transaction_type} onTransactionTypeChange={this.handleTransactionTypeChange} />
        </div>

        <div className="form-group">
          {
            this.state.transaction_type == 'debit' &&
            <BudgetSelect budgets={BudgetService.getBudgets()} from={this.state.from} onChange={(e) => this.handleFormInput('from', e)} />
          }
        </div>

        <div className="form-group">
          $<input type="text" name="amount" placeholder="Amount" className="form-control amount" value={this.state.amount} onChange={(e) => this.handleFormInput('amount', e)} />
        </div>

        <div className="form-group">
          <input type="text" name="motive" placeholder="Note" className="form-control" value={this.state.motive} onChange={(e) => this.handleFormInput('motive', e)} />
        </div>

        <div className="form-group">
          <input type="submit" name="submit" value="save" className="btn btn-primary" />
        </div>

        <FormValidationMessages validationMessages={this.state.validation_messages} />
      </form>
    );
  }
}

export default withRouter(AddTransactionForm);
