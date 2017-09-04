var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');

router.use(helpers.verifyAccount);

router.get('/', helpers.getTransactions, function (req, res) {
  res.send(JSON.stringify(req.transactions));
});

router.post('/', helpers.validateRequestBody(config.transaction_required_fields), helpers.getBudgets, function (req, res) {
  if (!isValidTransactionEndpoint(req.validated_body.from, req.budgets) || !isValidTransactionEndpoint(req.validated_body.to, req.budgets)) {
    return helpers.userError(res, '"to" and "from" properties must be valid.');
  }
  var new_transaction = new Models.Transaction(req.validated_body);
  new_transaction.save()
  .then(transaction => {
    res.send(JSON.stringify(transaction));
  })
  .catch(error => {
    helpers.serverError(res, 'Database Error :(');
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
