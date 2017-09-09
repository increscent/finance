var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');
var Budget = require('../classes/Budget');

router.use(helpers.verifyAccount);

router.get('/', helpers.getBudgets, function (req, res) {
  req.budgets.push({name: 'Other'});
  res.send(JSON.stringify(req.budgets));
});

router.put('/:name', helpers.validateRequestBody(config.budget_required_fields), helpers.getBudgets, helpers.getTransactions, function (req, res) {
  var budget = new Budget(req.account, req.budgets, req.params.name, req.transactions);
  budget.updateOrCreate(req.validated_body)
  .then(budget => {
    res.send(JSON.stringify(budget));
  })
  .catch(error => {
    helpers.errorResponse(res, error.message);
    console.log(error);
  });
});

router.delete('/:name', helpers.getBudgets, helpers.getTransactions, function (req, res) {
  var budget = new Budget(req.account, req.budgets, req.params.name, req.transactions);
  budget.delete()
  .then(() => {
    res.send(JSON.stringify({success: true}));
  })
  .catch(error => {
    helpers.errorResponse(res, error.message);
    console.log(error);
  })
});

module.exports = router;
