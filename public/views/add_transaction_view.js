import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormValidationMessages} from './components/form_class.js';
import mixin from 'mixin';

export default class AddTransactionForm extends mixin(Form, React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      transaction_type: 'debit',
      categories: this.props.debitCategories,
      category: '',
      motive: '',
      amount: '',
      validation_messages: []
    };

    this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.setDefaultCategory(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultCategory(nextProps);
  }

  setDefaultCategory(props) {
    var default_category = this.getDefaultCategory(this.state.transaction_type, props);
    this.setState({
      category: default_category
    });
  }

  getDefaultCategory(transaction_type, props) {
    var categories = (transaction_type == 'debit')? props.debitCategories:props.creditCategories;
    return categories[0]? categories[0].id:'';
  }

  handleTransactionTypeChange(e) {
    var transaction_type = e.target.value;
    var default_category = this.getDefaultCategory(transaction_type, this.props);
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

    if (error_messages.length) {
      this.setState({
        validation_messages: error_messages
      });
    } else {
      // validation successful
      console.log('yay');
    }
  }

  render() {
    var select_categories = (this.state.transaction_type == 'debit')? this.props.debitCategories:this.props.creditCategories;

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
