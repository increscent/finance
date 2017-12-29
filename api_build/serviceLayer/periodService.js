'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPeriods = getPeriods;

var _models = require('../dataLayer/models');

var _converters = require('../dataLayer/converters');

function getPeriods(accountId) {
  return _models.Period.find({ account_id: accountId }).then(function (periods) {
    return periods.map(_converters.convertPeriod);
  });
}