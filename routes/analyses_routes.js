var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var Analysis = require('../classes/Analysis');

router.use(helpers.verifyAccount);

router.get('/overview', helpers.getBudgets, helpers.getTransactions, function (req, res) {
  var analysis = new Analysis(req.budgets, req.transactions);
  res.send(JSON.stringify(analysis.getOverview()));
});

module.exports = router;
