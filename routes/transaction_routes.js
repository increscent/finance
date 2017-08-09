var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');

router.get('/transaction/:type/all', function (req, res) {
  var Model = (req.params.type.toLowerCase() == 'credit')? Models.Credit:Models.Debit;
  Model.find(function (err, transactions) {
    if (!transactions) transactions = [];
    res.send(JSON.stringify(transactions));
  });
});

router.post('/transaction/:type', function (req, res) {
  if (!req.body.date) req.body.date = Date.now();
  var required_fields = ['category', 'motive', 'amount', 'date'];
  if (!helpers.validateRequestBody(req.body, required_fields)) return helpers.userError(res, 'Missing one or more required fields: ' + required_fields.toString());

  var Model = (req.params.type.toLowerCase() == 'credit')? Models.Credit:Models.Debit;
  new Model(req.body).save(function (err, transaction) {
    res.send('Transaction saved successfully!');
  });
});

router.delete('/transaction/:type/:id', function (req, res) {
  var Model = (req.params.type.toLowerCase() == 'credit')? Models.Credit:Models.Debit;
  Model.findOne({_id: req.params.id}, function (err, transaction) {
    if (err || !transaction) return helpers.userError(res, 'Transaction does not exist: ' + req.params.id);
    transaction.remove(function (err) {
      res.send('Transaction deleted successfully!');
    });
  });
});

module.exports = router;
