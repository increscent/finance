import React from 'react';
import {withRouter} from 'react-router-dom';
import BudgetService from '../../Services/BudgetService.js';
import Form from '../Components/Form.js';
import FormValidationMessages from '../Components/FormValidationMessages.js';
import mixin from 'mixin';

class AddBudgetForm extends mixin(Form, React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || '',
      allowance: props.allowance || '',
      allowance_type: props.allowance_type || '$',
      validation_messages: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
    this.handleBudgetDelete = this.handleBudgetDelete.bind(this);
  }

  componentDidMount() {
    this.budgetServiceListenerId = BudgetService.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    BudgetService.unRegisterListener(this.budgetServiceListenerId);
  }

  handleBudgetDelete(e) {
    e.preventDefault();
    BudgetService.deleteBudget(this.props.uri)
    .then(() => {
      this.props.history.goBack();
    })
    .catch(error => {
      this.setState({
        validation_messages: [error.toString()]
      });
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var rules = [
      {name: 'name', validate: (x) => x, error_message: 'Please enter a name'},
      {name: 'name', validate: (x) => BudgetService.getBudgets().find((budget) => x.trim().toLowerCase() != budget.name.trim().toLowerCase()), error_message: 'That name already exists. Please enter a unique budget name.'},
      {name: 'allowance_type', validate: (x) => x == '%' || x == '$', error_message: 'Please select an allowance type ($ or %).'},
      {name: 'allowance', validate: (x) => parseFloat(x), error_message: 'Please enter a valid amount.'},
      {name: 'allowance', validate: (x) => this.state.allowance_type == '$' || (x >= 0 && x <= 100), error_message: 'The allowance percentage must be between 0 and 100.'},
      {name: 'allowance', validate: (x) => parseFloat(x) && parseFloat(x) > 0, error_message: 'The allowance must be a positive number.'}
    ];

    var error_messages = this.validateFormInput(rules);
    this.setState({
      validation_messages: error_messages
    });

    if (!error_messages.length) {
      // validation successful
      var name = this.state.name.trim();
      BudgetService.addOrUpdateBudget({
        uri: this.props.uri || name,
        name: name,
        allowance_type: this.state.allowance_type,
        allowance: parseFloat(this.state.allowance)
      })
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => {
        this.setState({
          validation_messages: [error.toString()]
        });
      });
    }
  }

  render() {
    return (
      <form id="addBudgetForm" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <input type="text" name="category" placeholder="Name" className="form-control" value={this.state.name} onChange={(e) => this.handleFormInput('name', e)} />
        </div>

        <div className="form-group">
          <select value={this.state.allowance_type} onChange={(e) => this.handleFormInput('allowance_type', e)} className="form-control allowance-type">
            <option value="$">$</option>
            <option value="%">%</option>
          </select>
          <input type="text" name="allowance" placeholder="Amount" className="form-control amount" value={this.state.allowance} onChange={(e) => this.handleFormInput('allowance', e)} />
        </div>

        <div className="form-group">
          <input type="submit" name="submit" value="save" className="btn btn-primary" />
        </div>

        {
          this.props.uri &&
          <div className="form-group">
            <a href="#" className="text-danger" onClick={this.handleBudgetDelete}>delete budget</a>
          </div>
        }

        <FormValidationMessages validationMessages={this.state.validation_messages} />
      </form>
    );
  }
}

export default withRouter(AddBudgetForm);
