import React from 'react';
import ReactDOM from 'react-dom';

export default class AddTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction_type: 'debit',
      categories: this.props.debitCategories,
      category: '',
      motive: '',
      amount: ''
    };

    this.onTransactionTypeChange = this.onTransactionTypeChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onMotiveChange = this.onMotiveChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  updateCategories(props, transaction_type, current_category) {
    var categories = (transaction_type == 'debit')? props.debitCategories:props.creditCategories;
    var category = current_category || (categories[0] || '');
    this.setState({
      categories: categories,
      category: category.id
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateCategories(nextProps, this.state.transaction_type, this.state.category);
  }

  onTransactionTypeChange(e) {
    var transaction_type = (e.target.value == 'debit')? 'debit':'credit';
    this.updateCategories(this.props, transaction_type);
    this.setState({
      transaction_type: transaction_type
    });
  }

  onCategoryChange(e) {
    this.setState({
      category: e.target.value
    });
  }

  onMotiveChange(e) {
    this.setState({
      motive: e.target.value
    });
  }

  onAmountChange(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();

    var formIsValid = true;
    

    console.log(this.state.transaction_type);
    console.log(this.state.category);
    console.log(this.state.motive);
    console.log(parseFloat(this.state.amount));
  }

  render() {
    var categories = this.state.categories.map((x) => {
      return <option key={x.id} value={x.id}>{x.category}</option>
    });

    return (
      <form id="addTransactionForm" onSubmit={this.onFormSubmit}>
        <input type="radio" name="transaction_type" value="debit" checked={this.state.transaction_type == 'debit'} onChange={this.onTransactionTypeChange} />Debit
        <input type="radio" name="transaction_type" value="credit" checked={this.state.transaction_type == 'credit'} onChange={this.onTransactionTypeChange} />Credit
        <select value={this.state.category} onChange={this.onCategoryChange}>
          {categories}
        </select>
        <input type="text" name="motive" placeholder="note" value={this.state.motive} onChange={this.onMotiveChange} />
        <input type="text" name="amount" value={this.state.amount} onChange={this.onAmountChange} />
        <input type="submit" name="submit" value="save" />
      </form>
    );
  }
}
