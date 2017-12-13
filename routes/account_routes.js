var express = require('express');
var router = express.Router();
var Models = require('../models');
var Helpers = require('../classes/Helpers');
var Account = require('../classes/Account');

// router.post('/', function (req, res) {
//   new Models.Account().save(function (err, account) {
//     res.send(JSON.stringify(account));
//   });
// });

router.get('/periods', Helpers.verifyAccount, function (req, res) {
  res.send(JSON.stringify([{
      _id: null,
      start_date: req.account.budget_period_start,
      end_date: (new Date()).toString()
    }, ...req.account.past_budget_periods]));
});

router.post('/periods', Helpers.verifyAccount, Helpers.getBudgets, function (req, res) {
  var account = new Account(req.account, req.budgets);
  account.startNewPeriod()
  .then(() => {
    res.send(JSON.stringify({success: true}));
  })
  .catch(error => {
    Helpers.errorResponse(res, error.message);
    console.log(error);
  });
});

module.exports = router;
