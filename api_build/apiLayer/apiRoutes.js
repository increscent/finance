'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middleware = require('./middleware');

var _accountRoutes = require('./accountRoutes');

var _accountRoutes2 = _interopRequireDefault(_accountRoutes);

var _periodRoutes = require('./periodRoutes');

var _periodRoutes2 = _interopRequireDefault(_periodRoutes);

var _categoryRoutes = require('./categoryRoutes');

var _categoryRoutes2 = _interopRequireDefault(_categoryRoutes);

var _transactionRoutes = require('./transactionRoutes');

var _transactionRoutes2 = _interopRequireDefault(_transactionRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _express.Router)().use('/', _middleware.no304).use('/', _middleware.verifyAccount).use('/account', _accountRoutes2.default).use('/period', _periodRoutes2.default).use('/category', _categoryRoutes2.default).use('/transaction', _transactionRoutes2.default).use('/', _middleware.handleApiErrors);