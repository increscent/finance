import React from 'react';
import ReactDOM from 'react-dom';

export default class AddTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction_type: 'debit',
      category: '',
      motive: '',
      amount: null
    };

    this.onTransactionTypeChange = this.onTransactionTypeChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onMotiveChange = this.onMotiveChange.bind(this);
  }

  onTransactionTypeChange(e) {
    this.setState({
      transaction_type: (e.target.value == 'debit')? 'debit':'credit',
      category: ''
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

  render() {
    var categories = (this.state.transaction_type == 'debit')?
      this.props.debitCategories.map((x) => {
        return <option key={x.id} value={x.id}>{x.category}</option>
      })
      :
      this.props.creditCategories.map((x, i) => {
        return <option key={i} value={x}>{x}</option>
      });


    return (
      <form id="addTransactionForm">
        <input type="radio" name="transaction_type" value="debit" checked={this.state.transaction_type == 'debit'} onChange={this.onTransactionTypeChange} />Debit
        <input type="radio" name="transaction_type" value="credit" checked={this.state.transaction_type == 'credit'} onChange={this.onTransactionTypeChange} />Credit
        <select value={this.state.category} onChange={this.onCategoryChange}>
          {categories}
        </select>
        <input type="text" name="motive" placeholder="note" value={this.state.motive} onChange={this.onMotiveChange} />
        <input type="submit" name="submit" value="save" />
      </form>
    );
  }
}
