'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _accountService = require('../serviceLayer/accountService');

exports.default = (0, _express.Router)().get('/', function (req, res, next) {
  (0, _accountService.getAccount)(req.accountId).then(function (account) {
    return res.send(JSON.stringify(account));
  }).catch(function (error) {
    return next(error);
  });
});