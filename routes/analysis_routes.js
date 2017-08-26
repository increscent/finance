var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');
var Analysis = require('../classes/analysis');

router.use(helpers.verifyAccount);

router.get('/overview', helpers.getBudgets, helpers.getCredits, helpers.getDebits, function (req, res) {
  var analysis = new Analysis(req.budgets, req.credits, req.debits);
  res.send(JSON.stringify(analysis.getOverview()));
});

module.exports = router;
