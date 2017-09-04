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
  var new_transaction = new Transaction(req.account, req.budgets, req.validated_body);
  new_transaction.save((error, transaction) => {
    if (error) return helpers.serverError(res, error);

    res.send(JSON.stringify(transaction));
  });
});

router.delete('/:id', function (req, res) {
  Models.Transaction.findOne({_id: req.params.id}).remove().exec()
  .then(() => {
    res.send('Transaction deleted successfully!');
  })
  .catch(error => {
    helpers.serverError(res, 'Database Error :(');
  });
});

module.exports = router;
