var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');

router.use(helpers.verifyAccount);

router.get('/budgets', helpers.getBudgets, function (req, res) {
  req.budgets.push({
    _id: 'Other',
    category: 'Other'
  });
  res.send(JSON.stringify(req.budgets));
});

router.put('/', helpers.validateRequestBody(config.budget_required_fields), function (req, res) {
  Models.Budget.findOne({category: req.validated_body.category})
  .then(budget => {
    if (budget) {
      return helpers.userError(res, 'Budget category already exists: ' + budget.category);
    } else {
      var new_budget = new Models.Budget(req.validated_body);
      return new_budget.save();
    }
  })
  .then(budget => {
    res.send(JSON.stringify(budget));
  })
  .catch(error => {
    helpers.serverError(res, 'Database Error :(');
  });
});

router.post('/', helpers.validateRequestBody(config.budget_required_fields), function (req, res) {
  Models.Budget.findOne({_id: req.body._id})
  .then(budget => {
    if (budget) {
      budget.category = req.validated_body.category;
      budget.allowance = req.validated_body.allowance;
      budget.allowance_type = req.validated_body.allowance_type;
      return budget.save();
    } else {
      return helpers.userError(res, 'Budget does not exist: ' + req.body._id);
    }
  })
  .then(budget => {
    res.send('Budget saved successfully!');
  })
  .catch(error => {
    helpers.serverError(res, 'Database Error :(');
  });
});

router.delete('/:id', function (req, res) {
  Models.Budget.findOne({_id: req.params.id}).remove().exec()
  .then(() => {
    res.send('Budget deleted successfully!');
  })
  .catch(error => {
    helpers.serverError(res, 'Database Error :(');
  });
});

module.exports = router;
