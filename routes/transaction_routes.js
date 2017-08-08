var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');

router.get('/transaction/:type/all', function (req, res) {
  var Model = (req.params.type.toLowerCase() == 'credit')? Models.Credit:Models.Debit;
  Model.find(function (err, transactions) {
    if (err) return helpers.serverError('Database Error!');
    if (!transactions) transactions = [];
    res.send(JSON.stringify(transactions));
  });
});

router.post('/transaction/:type', function (req, res) {
  var required_fields = ['category', 'motive', 'amount'];
  if (!helpers.validateRequestBody(req.body, required_fields)) return helpers.userError(res, 'Missing one or more required fields: ' + required_fields.toString());

  var Model = (req.params.type.toLowerCase() == 'credit')? Models.Credit:Models.Debit;
  new Model({
    category: req.body.category,
    motive: req.body.motive,
    amount: req.body.amount
  }).save(function (err, transaction) {
    if (err) return helpers.serverError(res, 'Database Error!');
    res.send('Transaction saved successfully!');
  });
});

router.delete('/transaction/:type/:id', function (req, res) {
  var Model = (req.params.type.toLowerCase() == 'credit')? Models.Credit:Models.Debit;
  Model.findOne({_id: req.params.id}, function (err, transaction) {
    if (err || !transaction) return helpers.userError(res, 'Transaction does not exist: ' + req.params.id);
    transaction.remove(function (err) {
      if (err) return helpers.serverError(res, 'Database Error!');
      res.send('Transaction deleted successfully!');
    });
  });
});

module.exports = router;
