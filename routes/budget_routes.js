var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');

router.get('/budget/all', function (req, res) {
  Models.Budget.find(function (err, budgets) {
    if (!budgets) budgets = [];
    res.send(JSON.stringify(budgets));
  });
});

router.post('/budget', function (req, res) {
  if (!req.body.start_date) req.body.start_date = Date.now();
  var required_fields = ['category', 'allowance', 'allowance_type', 'start_date'];
  if (!helpers.validateRequestBody(req.body, required_fields)) return helpers.userError(res, 'Missing one or more required fields: ' + required_fields.toString());

  Models.Budget.findOne({category: req.body.category}, function (err, budget) {
    if (budget) return helpers.userError(res, 'Category already exists: ' + req.body.category);

    new Models.Budget(req.body).save(function (err, budget) {
      res.send('Budget saved successfully!');
    });
  });
});

router.delete('/budget/:id', function (req, res) {
  Models.Budget.findOne({_id: req.params.id}, function (err, budget) {
    if (err || !budget) return helpers.userError(res, 'Id does not exist: ' + req.params.id);
    budget.remove(function (err) {
      res.send('Budget deleted successfully!');
    })
  });
});

module.exports = router;
