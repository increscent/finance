import React from 'react';
import ReactDOM from 'react-dom';
import OverviewModel from '../models/overview_model.js';
import BalanceTable from '../views/overview_view.js';
import BaseController from './base_controller.js';

export default class OverviewController extends BaseController {
  constructor(props) {
    super(props, OverviewModel, BalanceTable);
  }
}
