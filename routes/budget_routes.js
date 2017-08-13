var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');
var Budget = require('../classes/budget');

router.use(helpers.getAccountData);

router.get('/', function (req, res) {
  var budgets = req.account.budgets;
  if (!budgets) budgets = [];
  res.send(JSON.stringify(budgets));
});

router.put('/', helpers.validateRequestBody(config.budget_required_fields), function (req, res) {
  if (Budget.findByCategory(req.account.budgets, req.body.category) || req.body.category == 'Other') {
    return helpers.userError(res, 'Budget category already exists: ' + req.body.category);
  }

  var new_budget = helpers.generateNewDocument(config.budget_required_fields, req.body);
  req.account.budgets.push(new_budget);
  req.account.save().then(function () {
    res.send('Budget saved successfully!');
  });
});

router.post('/', helpers.validateRequestBody(config.budget_required_fields), function (req, res) {
  if (!Budget.findById(req.account.budgets, req.body._id)) {
    return helpers.userError(res, 'Budget does not exist: ' + req.body._id);
  }

  var new_budget = helpers.generateNewDocument(config.budget_required_fields, req.body);
  new_budget._id = req.body._id;
  Budget.replaceBudget(req.account.budgets, new_budget, req.body._id);
  req.account.save().then(function () {
    res.send('Budget updated successfully!');
  });
});

// router.delete('/:budget_id', helpers.getAccountData, function (req, res) {
//   Budget.removeBudget(req.account.budgets, req.params.budget_id);
//   req.account.save().then(function () {
//     res.send('Budget deleted successfully!');
//   });
// });

module.exports = router;
