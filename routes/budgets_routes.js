var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var config = require('../config');

router.use(helpers.verifyAccount);

router.get('/', helpers.getBudgets, function (req, res) {
  req.budgets.push({
    name: 'Other'
  });
  res.send(JSON.stringify(req.budgets));
});

// router.post('/', helpers.validateRequestBody(config.budget_required_fields), function (req, res) {
//   Models.Budget.findOne({category: req.validated_body.category})
//   .then(budget => {
//     if (budget) {
//       return helpers.userError(res, 'Budget category already exists: ' + budget.category);
//     } else {
//       var new_budget = new Models.Budget(req.validated_body);
//       return new_budget.save();
//     }
//   })
//   .then(budget => {
//     res.send(JSON.stringify(budget));
//   })
//   .catch(error => {
//     helpers.serverError(res, 'Database Error :(');
//   });
// });

router.put('/:name', helpers.validateRequestBody(config.budget_required_fields), function (req, res) {
  req.validated_body.name = req.params.name; // The budget name may not be changed -- a budget must be deleted and then created
  if (!isSafeBudgetName(req.params.name)) {
    return helpers.userError(res, 'You cannot modify that budget!');
  }
  Models.Budget.findOne({name: req.params.name})
  .then(budget => {
    if (budget) {
      budget.allowance = req.validated_body.allowance;
      budget.allowance_type = req.validated_body.allowance_type;
      return budget.save();
    } else {
      var new_budget = Models.Budget(req.validated_body);
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

router.delete('/:name', function (req, res) {
  Models.Budget.findOne({name: req.params.name}).remove().exec()
  .then(() => {
    res.send('Budget deleted successfully!');
  })
  .catch(error => {
    helpers.serverError(res, 'Database Error :(');
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
