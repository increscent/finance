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
  var budget = new Budget(req.account, req.budgets, req.transactions, req.params.name);
  budget.save(req.validated_body, (error, budget) => {
    if (error) return helpers.serverError(res, error);
    res.send(JSON.stringify(budget));
  });
});

router.delete('/:name', helpers.getBudgets, helpers.getTransactions, function (req, res) {
  var budget = new Budget(req.account, req.budgets, req.transactions, req.params.name);
  budget.delete(error => {
    if (error) return helpers.serverError(res, error);
    res.send('Budget deleted successfully!');
  });
});

module.exports = router;

function isSafeBudgetName(budget_name) {
  if (config.reserved_budget_names.indexOf(budget_name) > -1) {
    return false;
  } else {
    return true;
  }
}
