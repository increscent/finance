var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');

router.get('/analysis/overview', function (req, res) {
  Models.Budget.find(function (err, budgets) {
    var budget = budgets[1];
    Models.Credit.find({date: {$gt: budget.start_date}}, function (err, credits) {
      Models.Debit.find({category: budget.category, date: {$gt: budget.start_date}}, function (err, debits) {
        var totalCredits = sumTransactions(credits);
        var totalDebits = sumTransactions(debits);
        var totalAllowance = calculateAllowance(totalCredits, budget.allowance, budget.allowance_type, budget.start_date);
        var balance = totalAllowance - totalDebits;
        res.send('Debits: ' + totalDebits + ' Allowance: ' + totalAllowance + ' Balance: ' + balance);
      });
    });
  });
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
