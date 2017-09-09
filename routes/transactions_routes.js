var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');
var Transaction = require('../classes/Transaction');

router.use(helpers.verifyAccount);

router.get('/', helpers.getTransactions, function (req, res) {
  res.send(JSON.stringify(req.transactions));
});

router.post('/', helpers.validateRequestBody(config.transaction_required_fields), helpers.getBudgets, function (req, res) {
  var transaction = new Transaction(req.account, req.budgets);
  transaction.create(req.validated_body)
  .then(newTransaction => {
    res.send(JSON.stringify(newTransaction));
  })
  .catch(error => {
    helpers.errorResponse(res, error.message);
  });
});

router.delete('/:id', function (req, res) {
  var existingTransaction = new Transaction(req.account);
  existingTransaction.delete(req.params.id)
  .then(() => {
    res.send(JSON.stringify({success: true}));
  })
  .catch(error => {
    helpers.errorResponse(res, error.message);
  })
});

module.exports = router;
