import React from 'react';
import ReactDOM from 'react-dom';
import HistoryModel from '../models/history_model.js';
import HistoryTable from '../views/history_view.js';
import BaseController from './base_controller.js';

export default class HistoryController extends BaseController {
  constructor(props) {
    super(props, HistoryModel, HistoryTable);
  }
}
