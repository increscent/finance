import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";
import TransactionService from '../services/transaction_service.js';
import BudgetService from '../services/budget_service.js';
import {Form, FormValidationMessages} from './components/form_class.js';
import mixin from 'mixin';

class AddTransaction extends mixin(Form, React.Component) {
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
    this.budgetServiceListenerId = BudgetService.registerListener(this.setDefaultCategory);
  }

  componentWillUnmount() {
    TransactionService.unRegisterListener(this.transactionServiceListenerId);
    BudgetService.unRegisterListener(this.budgetServiceListenerId);
  }

  getDebitCategories() {
    return BudgetService.budgets.map(x => {
      return {
        id: x._id,
        category: x.category
      };
    });
  }

  getDefaultCategory(transaction_type) {
    var categories = (transaction_type == 'debit')? this.getDebitCategories():TransactionService.creditCategories;
    return categories[0]? categories[0].id:'';
  }

  handleTransactionTypeChange(e) {
    var transaction_type = e.target.value;
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
    var select_categories = (this.state.transaction_type == 'debit')? this.getDebitCategories():TransactionService.creditCategories;

    return (
      <form id="addTransactionForm" onSubmit={this.handleFormSubmit}>
        <input type="radio" name="transaction_type" value="debit" checked={this.state.transaction_type == 'debit'} onChange={this.handleTransactionTypeChange} />Debit
        <input type="radio" name="transaction_type" value="credit" checked={this.state.transaction_type == 'credit'} onChange={this.handleTransactionTypeChange} />Credit
        {
          this.state.transaction_type == 'debit' &&
          <DebitCategorySelect categories={select_categories} category={this.state.category} onChange={(e) => this.handleFormInput('category', e)} />
        }
        {
          this.state.transaction_type == 'credit' &&
          <CreditCategorySelect categories={select_categories} category={this.state.category} onChange={(e) => this.handleFormInput('category', e)} />
        }
        <input type="text" name="motive" placeholder="Note" value={this.state.motive} onChange={(e) => this.handleFormInput('motive', e)} />
        $<input type="text" name="amount" value={this.state.amount} onChange={(e) => this.handleFormInput('amount', e)} />
        <input type="submit" name="submit" value="save" />
        <FormValidationMessages validationMessages={this.state.validation_messages} />
      </form>
    );
  }
}

function DebitCategorySelect(props) {
  return (
    <span>
      <select value={props.category} style={{width: "120px"}} onChange={props.onChange}>
        {
          props.categories.map(x => {
            return <option key={x.id} value={x.id}>{x.category}</option>
          })
        }
      </select>
    </span>
  );
}

function CreditCategorySelect(props) {
  return (
    <span>
      {
        Boolean(props.categories.find((x) => x.id == props.category)) ||
        <CustomSelectInput value={props.category} onChange={props.onChange} />
      }

      <select value={props.category} style={{width: "120px"}} onChange={props.onChange}>
        <option value="">New Category</option>
        {
          props.categories.map(x => {
            return <option key={x.id} value={x.id}>{x.category}</option>
          })
        }
      </select>
    </span>
  );
}

function CustomSelectInput(props) {
  return <input type="text" value={props.value} style={{position: "absolute", zIndex: 1, width: "100px"}} onChange={props.onChange} autoFocus />;
}

export default withRouter(AddTransaction);
