var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');

router.use(helpers.verifyAccount);

router.get('/credits', helpers.getCredits, function (req, res) {
  res.send(JSON.stringify(req.credits));
});

router.get('/debits', helpers.getDebits, function (req, res) {
  res.send(JSON.stringify(req.debits));
});

router.put('/:type', helpers.validateRequestBody(config.transaction_required_fields), function (req, res) {
  var model = req.params.type == 'debit'? Models.Debit:Models.Credit;
  var new_transaction = new model(req.validated_body);
  new_transaction.save()
  .then(transaction => {
    res.send(JSON.stringify(transaction));
  })
  .catch(error => {
    helpers.serverError(res, 'Database Error :(');
  });
});

router.delete('/:type/:id', function (req, res) {
  var model = req.params.type == 'debit'? Models.Debit:Models.Credit;
  model.findOne({_id: req.params.id}).remove().exec()
  .then(() => {
    res.send('Transaction deleted successfully!');
  })
  .catch(error => {
    helpers.serverError(res, 'Database Error :(');
  });
});

module.exports = router;
