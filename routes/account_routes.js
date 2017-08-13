var express = require('express');
var router = express.Router();
var Models = require('../models');
var helpers = require('./helpers');

router.put('/new', function (req, res) {
  new Models.Account().save(function (err, account) {
    res.send(account._id);
  });
});

module.exports = router;
