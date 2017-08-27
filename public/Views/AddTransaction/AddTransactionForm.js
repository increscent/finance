import React from 'react';
import {withRouter} from "react-router-dom";
import TransactionService from '../../Services/TransactionService.js';
import DebitCategorySelect from './DebitCategorySelect.js';
import CreditCategorySelect from './CreditCategorySelect.js';
import Form from '../Components/Form.js';
import FormValidationMessages from '../Components/FormValidationMessages.js';
import mixin from 'mixin';
import DebitCreditRadioButtons from './DebitCreditRadioButtons.js';

class AddTransactionForm extends mixin(Form, React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      transaction_type: 'debit',
      category: this.getDefaultCategory('debit'),
      motive: '',
      amount: '',
      validation_messages: []
    };

    this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
    this.setDefaultCategory = this.setDefaultCategory.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  setDefaultCategory() {
    if (this.state.category) return;
    var default_category = this.getDefaultCategory(this.state.transaction_type);
    this.setState({
      category: default_category
    });
  }

  componentDidMount() {
    this.transactionServiceListenerId = TransactionService.registerListener(this.setDefaultCategory);
  }

  componentWillUnmount() {
    TransactionService.unRegisterListener(this.transactionServiceListenerId);
  }

  getDefaultCategory(transaction_type) {
    var categories = (transaction_type == 'debit')? TransactionService.debitCategories:TransactionService.creditCategories;
    return categories[0]? categories[0].id:'';
  }

  handleTransactionTypeChange(transaction_type) {
    var default_category = this.getDefaultCategory(transaction_type);
    this.setState({
      transaction_type: transaction_type,
      category: default_category
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var rules = [
      {name: 'transaction_type', validate: (x) => x == 'debit' || x == 'credit', error_message: 'Please select a transaction type.'},
      {name: 'category', validate: (x) => x, error_message: 'Please select a category.'},
      {name: 'motive', validate: (x) => true, error_message: 'It doesn\'t matter what note you write.'},
      {name: 'amount', validate: (x) => parseFloat(x), error_message: 'Please enter a valid amount.'}
    ];

    var error_messages = this.validateFormInput(rules);
    this.setState({
      validation_messages: error_messages
    });

    if (error_messages.length) {
      // validation failed
    } else {
      // validation successful
      TransactionService.addTransaction({
        type: this.state.transaction_type,
        category: this.state.category.trim(),
        motive: this.state.motive.trim(),
        amount: parseFloat(this.state.amount)
      }, error => {
        if (error) {
          this.setState({
            validation_messages: [error]
          })
        } else {
          this.props.history.goBack();
        }
      });
    }
  }

  render() {
    var select_categories = (this.state.transaction_type == 'debit')? TransactionService.debitCategories:TransactionService.creditCategories;

    return (
      <form id="addTransactionForm" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <DebitCreditRadioButtons transaction_type={this.state.transaction_type} onTransactionTypeChange={this.handleTransactionTypeChange} />
        </div>

        <div className="form-group">
          {
            this.state.transaction_type == 'debit' &&
            <DebitCategorySelect categories={select_categories} category={this.state.category} onChange={(e) => this.handleFormInput('category', e)} />
          }
          {
            this.state.transaction_type == 'credit' &&
            <CreditCategorySelect categories={select_categories} category={this.state.category} onChange={(e) => this.handleFormInput('category', e)} />
          }
        </div>

        <div className="form-group">
          $<input type="text" name="amount" value={this.state.amount} onChange={(e) => this.handleFormInput('amount', e)} />
        </div>

        <div className="form-group">
          <input type="text" name="motive" placeholder="Note" value={this.state.motive} onChange={(e) => this.handleFormInput('motive', e)} />
        </div>

        <div className="form-group">
          <input type="submit" name="submit" value="save" />
        </div>
        
        <FormValidationMessages validationMessages={this.state.validation_messages} />
      </form>
    );
  }
}

export default withRouter(AddTransactionForm);
