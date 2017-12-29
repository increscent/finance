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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import transactionRoutes from './transactionRoutes';

exports.default = (0, _express.Router)().use('/', _middleware.verifyAccount).use('/account', _accountRoutes2.default).use('/period', _periodRoutes2.default).use('/category', _categoryRoutes2.default)
// router.use('/transaction', transactionRoutes);

.use('/', _middleware.handleErrors);