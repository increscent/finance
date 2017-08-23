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

    var transaction_type = this.state.transaction_type;
    var category = this.state.category;
    var motive = this.state.motive;
    var amount = parseFloat(this.state.amount);

    var formIsValid = true;
    var errorMessage = "";
    if (!category) {
      formIsValid = false;
      errorMessage += "Please choose/enter a valid category\n";
    }
    if (!amount) {
      formIsValid = false;
      errorMessage += "Please enter a valid transaction amount\n";
    }

    if (formIsValid) {
      console.log(transaction_type);
      console.log(category);
      console.log(motive);
      console.log(amount);
    } else {
      console.log(errorMessage);
    }
  }

  render() {
    return (
      <form id="addTransactionForm" onSubmit={this.onFormSubmit}>
        <input type="radio" name="transaction_type" value="debit" checked={this.state.transaction_type == 'debit'} onChange={this.onTransactionTypeChange} />Debit
        <input type="radio" name="transaction_type" value="credit" checked={this.state.transaction_type == 'credit'} onChange={this.onTransactionTypeChange} />Credit
        <CategorySelect category={this.state.category} categories={this.state.categories} enableCustomCategory={this.state.transaction_type == "credit"} onChange={this.onCategoryChange} />
        <input type="text" name="motive" placeholder="Note" value={this.state.motive} onChange={this.onMotiveChange} />
        $<input type="text" name="amount" value={this.state.amount} onChange={this.onAmountChange} />
        <input type="submit" name="submit" value="save" />
      </form>
    );
  }
}

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      custom_category: !props.categories.length && props.enableCustomCategory
    };

    this.onSelectChange = this.onSelectChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categories != nextProps.categories) {
      this.setState({
        category: nextProps.category,
        custom_category: !nextProps.categories.length && nextProps.enableCustomCategory
      });
    }
  }

  updateParent(value) {
    this.props.onChange({
      target: {
        value: value
      }
    });
  }

  onSelectChange(e) {
    var value = e.target.value;
    var custom_category = false;
    if (value == "custom_category") {
      value = "";
      custom_category = this.props.enableCustomCategory;
    }
    this.setState({
      category: value,
      custom_category: custom_category
    });
    this.updateParent(value);
  }

  onInputChange(e) {
    this.setState({
      category: e.target.value
    });
    this.updateParent(e.target.value);
  }

  render() {
    var custom_category_option = (this.props.enableCustomCategory)?
      <option value="custom_category">New Category</option>:null;

    return (
      <span>
        <CustomSelectInput isVisible={this.state.custom_category} value={this.state.category} onChange={this.onInputChange} />

        <select value={(this.state.custom_category)? 'custom_category':this.state.category} style={{width: "120px"}} onChange={this.onSelectChange}>
          {custom_category_option}
          {
            this.props.categories.map(x => {
              return <option key={x.id} value={x.id}>{x.category}</option>
            })
          }
        </select>
      </span>
    );
  }
}

function CustomSelectInput(props) {
  if (props.isVisible) {
    return <input type="text" value={props.value} style={{position: "absolute", zIndex: 1, width: "100px"}} onChange={props.onChange} autoFocus />;
  } else {
    return null;
  }
}
