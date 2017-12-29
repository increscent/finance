'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _periodService = require('../serviceLayer/periodService');

exports.default = (0, _express.Router)().get('/', function (req, res, next) {
  (0, _periodService.getPeriods)(req.accountId).then(function (periods) {
    return res.send(JSON.stringify(periods));
  }).catch(function (error) {
    res.statusCode = 500;
    next();
  });
});