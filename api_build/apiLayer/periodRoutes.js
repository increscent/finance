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
    return next(error);
  });
}).post('/', function (req, res, next) {
  (0, _periodService.createPeriod)(req.accountId).then(function (period) {
    return res.send(JSON.stringify(period));
  }).catch(function (error) {
    return next(error);
  });
}).delete('/', function (req, res, next) {
  (0, _periodService.deleteCurrentPeriod)(req.accountId).then(function () {
    return res.send(JSON.stringify({ success: true }));
  }).catch(function (error) {
    return next(error);
  });
});