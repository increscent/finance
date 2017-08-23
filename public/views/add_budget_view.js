import React from 'react';
import ReactDOM from 'react-dom';

export default class AddBudgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      allowance: '',
      allowance_type: '$',
      budgets: props.budgets
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormInputChange = this.onFormInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      budgets: nextProps.budgets
    });
  }

  onFormInputChange(property, e) {
    this.setState({
      [property]: e.target.value
    });
  }

  onFormSubmit(e) {
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

    if (formIsValid) {
      console.log(category);
      console.log(allowance_type);
      console.log(allowance);
    } else {
      console.log(errorMessage);
    }
  }

  render() {
    return (
      <form id="addBudgetForm" onSubmit={this.onFormSubmit}>
        <input type="text" name="category" placeholder="Name" value={this.state.category} onChange={(e) => this.onFormInputChange('category', e)} />
        Monthly Allowance
        <select value={this.state.allowance_type} onChange={(e) => this.onFormInputChange('allowance_type', e)}>
          <option value="$">$</option>
          <option value="%">%</option>
        </select>
        <input type="text" name="allowance" value={this.state.allowance} onChange={(e) => this.onFormInputChange('allowance', e)} />
        <input type="submit" name="submit" value="save" />
      </form>
    );
  }
}
