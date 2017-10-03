var express = require('express');
var router = express.Router();
var Models = require('../models');
var Helpers = require('../classes/Helpers');
var Analysis = require('../classes/Analysis');

router.use(Helpers.verifyAccount);

router.get('/overview', Helpers.getBudgets, Helpers.getTransactions, function (req, res) {
  var analysis = new Analysis(req.budgets, req.transactions);
  res.send(JSON.stringify(analysis.getOverview()));
});

module.exports = router;
