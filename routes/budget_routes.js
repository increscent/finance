var express = require('express');
var router = express.Router();
var Models = require('../models');
var Helpers = require('./Helpers');
var config = require('../config/route_config');
var Budget = require('../classes/Budget');

router.use(Helpers.verifyAccount);

router.get('/', Helpers.getBudgets, function (req, res) {
  req.budgets.push({name: 'Other'});
  res.send(JSON.stringify(req.budgets.map(Helpers.cleanBudget)));
});

router.put('/:name', Helpers.validateRequestBody(config.budget_required_fields), Helpers.getBudgets, Helpers.getTransactions, function (req, res) {
  var budget = new Budget(req.account, req.budgets, req.params.name, req.transactions);
  budget.updateOrCreate(req.validated_body)
  .then(budget => {
    res.send(JSON.stringify(Helpers.cleanBudget(budget)));
  })
  .catch(error => {
    Helpers.errorResponse(res, error.message);
    console.log(error);
  });
});

router.delete('/:name', Helpers.getBudgets, Helpers.getTransactions, function (req, res) {
  var budget = new Budget(req.account, req.budgets, req.params.name, req.transactions);
  budget.delete()
  .then(() => {
    res.send(JSON.stringify({success: true}));
  })
  .catch(error => {
    Helpers.errorResponse(res, error.message);
    console.log(error);
  });
});

module.exports = router;
