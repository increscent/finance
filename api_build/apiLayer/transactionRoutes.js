'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _routeConfig = require('../config/routeConfig');

var _middleware = require('./middleware');

var _transactionService = require('../serviceLayer/transactionService');

exports.default = (0, _express.Router)().get('/', function (req, res, next) {
  if (!req.query.periodId) return next({
    statusCode: 400,
    message: 'Please specify periodId as query string parameter.'
  });

  (0, _transactionService.getTransactions)(req.accountId, req.query.periodId).then(function (transactions) {
    return res.send(JSON.stringify(transactions));
  }).catch(function (error) {
    return next(error);
  });
}).post('/', (0, _middleware.verifyRequestBody)(_routeConfig.transactionRequiredFields), function (req, res, next) {
  (0, _transactionService.addTransaction)(req.accountId, req.body).then(function (transaction) {
    return res.send(JSON.stringify(transaction));
  }).catch(function (error) {
    return next(error);
  });
}).put('/:transactionId', function (req, res, next) {
  (0, _transactionService.updateTransaction)(req.accountId, req.params.transactionId, req.body).then(function (transaction) {
    return res.send(JSON.stringify({ success: true }));
  }).catch(function (error) {
    return next(error);
  });
}).delete('/:transactionId', function (req, res, next) {
  (0, _transactionService.deleteTransaction)(req.accountId, req.params.transactionId).then(function (transaction) {
    return res.send(JSON.stringify({ success: true }));
  }).catch(function (error) {
    return next(error);
  });
});