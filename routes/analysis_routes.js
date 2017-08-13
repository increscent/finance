var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var Analysis = require('../classes/analysis');

router.use(helpers.getAccountData);

router.get('/overview', function (req, res) {
  var analysis = new Analysis(req.account.budgets, req.account.credits, req.account.debits);
  res.send(JSON.stringify(analysis.getOverview()));
});

router.get('/history', function (req, res) {
  var analysis = new Analysis(req.account.budgets, req.account.credits, req.account.debits);
  res.send(JSON.stringify(analysis.getHistory()));
});

module.exports = router;
