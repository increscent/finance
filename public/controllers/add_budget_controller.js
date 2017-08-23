import React from 'react';
import ReactDOM from 'react-dom';
import AddBudgetModel from '../models/add_budget_model.js';
import AddBudgetForm from '../views/add_budget_view.js';
import BaseController from './base_controller.js';

export default class AddBudgetController extends BaseController {
  constructor(props) {
    super(props, AddBudgetModel, AddBudgetForm);

    // this.Model.handleFormSubmit = this.handleFormSubmit;
  }

  // handleFormSubmit(formState) {
  // }
}
