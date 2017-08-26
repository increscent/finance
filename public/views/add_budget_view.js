import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import BudgetService from '../services/budget_service.js';
import {Form, FormValidationMessages} from './components/form_class.js';
import mixin from 'mixin';

class AddBudget extends mixin(Form, React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      allowance: '',
      allowance_type: '$',
      validation_messages: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    this.budgetServiceListenerId = BudgetService.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    BudgetService.unRegisterListener(this.budgetServiceListenerId);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var rules = [
      {name: 'category', validate: (x) => x, error_message: 'Please enter a name'},
      {name: 'category', validate: (x) => !BudgetService.budgets.find((budget) => x.trim().toLowerCase() == budget.category.trim().toLowerCase()), error_message: 'That name already exists. Please enter a unique budget name.'},
      {name: 'allowance_type', validate: (x) => x == '%' || x == '$', error_message: 'Please select an allowance type ($ or %).'},
      {name: 'allowance', validate: (x) => parseFloat(x), error_message: 'Please enter a valid amount.'},
      {name: 'allowance', validate: (x) => this.state.allowance_type == '$' || (x >= 0 && x <= 100), error_message: 'The allowance percentage must be between 0 and 100.'}
    ];

    var error_messages = this.validateFormInput(rules);
    this.setState({
      validation_messages: error_messages
    });

    if (error_messages.length) {
      // validation failed
    } else {
      // validation successful
      BudgetService.addBudget({
        category: this.state.category.trim(),
        allowance_type: this.state.allowance_type,
        allowance: parseFloat(this.state.allowance)
      }, error => {
        if (error) {
          this.setState({
            validation_messages: [error]
          });
        } else {
          this.props.history.goBack();
        }
      });
    }
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
        <FormValidationMessages validationMessages={this.state.validation_messages} />
      </form>
    );
  }
}

export default withRouter(AddBudget);
