var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');
var Transaction = require('../classes/transaction');

router.get('/transaction/:type', helpers.getAccountData, function (req, res) {
  var type = req.params.type.toLowerCase();
  var collection = (type == 'credit')? req.account.credits:req.account.debits;
  if (!collection) collection = [];
  res.send(JSON.stringify(collection));
});

router.post('/transaction/:type', helpers.validateRequestBody(config.transaction_required_fields), helpers.getAccountData, function (req, res) {
  var type = req.params.type.toLowerCase();
  var collection = (type == 'credit')? req.account.credits:req.account.debits;
  var new_transaction = helpers.generateNewDocument(config.transaction_required_fields, req.body);
  collection.push(new_transaction);
  req.account.save().then(function () {
    res.send('Transaction saved successfully!');
  });
});

router.delete('/transaction/:type/:transaction_id', helpers.getAccountData, function (req, res) {
  var type = req.params.type.toLowerCase();
  var collection = (type == 'credit')? req.account.credits:req.account.debits;
  Transaction.removeTransaction(collection, req.params.transaction_id);
  req.account.save().then(function () {
    res.send('Transaction deleted successfully!');
  });
});

module.exports = router;
