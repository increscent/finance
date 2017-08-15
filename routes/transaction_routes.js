var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');
var Transaction = require('../classes/transaction');
var Budget = require('../classes/budget');

router.use(helpers.getAccountData);

router.get('/categories', function (req, res) {
  var debitCategories = Transaction.getDebitCategories(req.account.budgets);
  var creditCategories = Transaction.getCreditCategories(req.account.credits);
  res.send(JSON.stringify({
    debitCategories: debitCategories,
    creditCategories: creditCategories
  }));
});

router.get('/:type', function (req, res) {
  var type = req.params.type.toLowerCase();
  var collection = (type == 'credit')? req.account.credits:req.account.debits;
  if (!collection) collection = [];
  res.send(JSON.stringify(collection));
});

router.put('/:type', helpers.validateRequestBody(config.transaction_required_fields), function (req, res) {
  var type = req.params.type.toLowerCase();
  var collection = (type == 'credit')? req.account.credits:req.account.debits;

  if (type == 'debit' && !Budget.findById(req.account.budgets, req.body.category)) req.body.category = 'Other';

  var new_transaction = helpers.generateNewDocument(config.transaction_required_fields, req.body);
  collection.push(new_transaction);
  req.account.save().then(function () {
    res.send('Transaction saved successfully!');
  });
});

router.delete('/:type/:transaction_id', function (req, res) {
  var type = req.params.type.toLowerCase();
  var collection = (type == 'credit')? req.account.credits:req.account.debits;
  Transaction.removeTransaction(collection, req.params.transaction_id);
  req.account.save().then(function () {
    res.send('Transaction deleted successfully!');
  });
});

module.exports = router;
