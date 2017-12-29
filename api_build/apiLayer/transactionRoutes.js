'use strict';

var express = require('express');
var router = express.Router();
var Models = require('../models');
var Helpers = require('../classes/Helpers');
var config = require('../config/route_config');
var Transaction = require('../classes/Transaction');

router.use(Helpers.verifyAccount);

router.get('/', Helpers.getTransactions, function (req, res) {
  res.send(JSON.stringify(req.transactions.map(Helpers.cleanTransaction)));
});

router.post('/', Helpers.validateRequestBody(config.transaction_required_fields), Helpers.getBudgets, function (req, res) {
  var transaction = new Transaction(req.account, req.budgets);
  transaction.create(req.validated_body).then(function (newTransaction) {
    res.send(JSON.stringify(Helpers.cleanTransaction(newTransaction)));
  }).catch(function (error) {
    Helpers.errorResponse(res, error.message);
  });
});

router.put('/:id', Helpers.validateRequestBody(config.transaction_required_fields), function (req, res) {
  var transaction = new Transaction(req.account);
  req.validated_body._id = req.params.id;
  transaction.update(req.validated_body).then(function (newTransaction) {
    res.send(JSON.stringify(Helpers.cleanTransaction(newTransaction)));
  }).catch(function (error) {
    Helpers.errorResponse(res, error.message);
  });
});

router.delete('/:id', function (req, res) {
  var existingTransaction = new Transaction(req.account);
  existingTransaction.delete(req.params.id).then(function () {
    res.send(JSON.stringify({ success: true }));
  }).catch(function (error) {
    Helpers.errorResponse(res, error.message);
  });
});

module.exports = router;