var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var Account = require('../classes/Account');

router.post('/', function (req, res) {
  new Models.Account().save(function (err, account) {
    res.send(JSON.stringify(account));
  });
});

router.post('/newperiod', helpers.verifyAccount, helpers.getBudgets, function (req, res) {
  var account = new Account(req.account, req.budgets);
  account.startNewPeriod((error, account) => {
    if (error) return helpers.serverError(res, "There was a database error.");

    res.send(JSON.stringify(account));
  });
});

module.exports = router;
