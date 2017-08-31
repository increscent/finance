var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');

router.post('/', function (req, res) {
  new Models.Account().save(function (err, account) {
    res.send(JSON.stringify(account));
  });
});

module.exports = router;
