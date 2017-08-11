var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var Analysis = require('../classes/analysis');

router.get('/analysis/overview', helpers.getAccountData, function (req, res) {
  var analysis = new Analysis(req.account.budgets, req.account.credits, req.account.debits);
  res.send(JSON.stringify(analysis.getOverview()));
});

module.exports = router;

function sumTransactions(transactions) {
  var total = 0;
  for (var i in transactions) {
    total += transactions[i].amount;
  }
  return total;
}

function calculateAllowance(totalCredits, allowance, allowance_type, start_date) {
  if (allowance_type == '%') {
    return allowance / 100 * totalCredits;
  } else {
    var initialDate = new Date(start_date);
    var currentDate = new Date();
    var initialDateMonths = initialDate.getMonth() + (12 * initialDate.getYear());
    var currentDateMonths = currentDate.getMonth() + (12 * initialDate.getYear());
    var activeMonths = currentDateMonths - initialDateMonths;
    return allowance * activeMonths;
  }
}
