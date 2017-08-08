var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');

router.get('/budget/all', function (req, res) {
  Models.Budget.find(function (err, budgets) {
    if (err) return helpers.serverError('Database Error!');
    if (!budgets) budgets = [];
    res.send(JSON.stringify(budgets));
  });
});

router.post('/budget', function (req, res) {
  var required_fields = ['category', 'allowance', 'allowance_type'];
  if (!helpers.validateRequestBody(req.body, required_fields)) return helpers.userError(res, 'Missing one or more required fields: ' + required_fields.toString());

  Models.Budget.findOne({category: req.body.category}, function (err, budget) {
    if (budget) return helpers.userError(res, 'Category already exists: ' + req.body.category);

    new Models.Budget({
      category: req.body.category,
      allowance: req.body.allowance,
      allowance_type: (req.body.allowance_type == '%')? '%':'$'
    }).save(function (err, budget) {
      if (err) return helpers.serverError(res, 'Database Error!');
      res.send('Budget saved successfully!');
    });
  });
});

router.delete('/budget/:category', function (req, res) {
  Models.Budget.findOne({category: req.params.category}, function (err, budget) {
    if (err || !budget) return helpers.userError(res, 'Category does not exist: ' + req.params.category);
    budget.remove(function (err) {
      if (err) return helpers.serverError(res, 'Database Error!');
      res.send('Budget deleted successfully!');
    })
  });
});

module.exports = router;
