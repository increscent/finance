import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/form_class.js';
import mixin from 'mixin';

export default class AddBudgetForm extends mixin(Form, React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      allowance: '',
      allowance_type: '$'
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var category = this.state.category;
    var allowance_type = this.state.allowance_type;
    var allowance = parseFloat(this.state.allowance);

    var formIsValid = true;
    var errorMessage = "";
    if (!category) {
      formIsValid = false;
      errorMessage += "Please enter a valid category\n";
    }
    if (!allowance) {
      formIsValid = false;
      errorMessage += "Please enter a valid allowance\n";
    }
    if (allowance_type == '%' && (allowance < 0 || allowance > 100)) {
      formIsValid = false;
      errorMessage += "The allowance must be a valid percentage between 0% and 100%";
    }

    // if (formIsValid) {
      console.log(category);
      console.log(allowance_type);
      console.log(allowance);
    // } else {
      console.log(errorMessage);
      console.log(this.props.budgets);
    // }
  }

  render() {
    return (
      <form id="addBudgetForm" onSubmit={this.handleFormSubmit}>
        <input type="text" name="category" placeholder="Name" value={this.state.category} onChange={(e) => this.handleFormInput('category', e)} />
        Monthly Allowance
        <select value={this.state.allowance_type} onChange={(e) => this.handleFormInput('allowance_type', e)}>
          <option value="$">$</option>
          <option value="%">%</option>
        </select>
        <input type="text" name="allowance" value={this.state.allowance} onChange={(e) => this.handleFormInput('allowance', e)} />
        <input type="submit" name="submit" value="save" />
      </form>
    );
  }
}
