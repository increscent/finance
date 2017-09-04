var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var Account = require('../classes/Account');

router.use(helpers.verifyAccount);

router.get('/start_period', helpers.getBudgets, function (req, res) {
  var analysis = new Analysis(req.budgets, req.transactions);
  res.send(JSON.stringify(analysis.getOverview()));
});

module.exports = router;
