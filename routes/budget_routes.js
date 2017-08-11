var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');
var Budget = require('../classes/budget');

router.get('/budget', helpers.getAccountData, function (req, res) {
  var budgets = req.account.budgets;
  if (!budgets) budgets = [];
  res.send(JSON.stringify(budgets));
});

router.post('/budget', helpers.validateRequestBody(config.budget_required_fields), helpers.getAccountData, function (req, res) {
  if (Budget.findByCategory(req.account.budgets, req.body.category)) {
    return helpers.userError(res, 'Budget category already exists: ' + req.body.category);
  }

  var new_budget = helpers.generateNewDocument(config.budget_required_fields, req.body);
  req.account.budgets.push(new_budget);
  req.account.save().then(function () {
    res.send('Budget saved successfully!');
  });
});

// router.delete('/budget/:budget_id', helpers.getAccountData, function (req, res) {
//   Budget.removeBudget(req.account.budgets, req.params.budget_id);
//   req.account.save().then(function () {
//     res.send('Budget deleted successfully!');
//   });
// });

module.exports = router;
