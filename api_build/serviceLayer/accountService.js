'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findOrCreate = findOrCreate;
exports.getAccount = getAccount;

var _models = require('../dataLayer/models');

var _dateHelper = require('./dateHelper');

var _converters = require('../dataLayer/converters');

function findOrCreate(googleId, firstName, lastName) {
  return findByGoogleId(googleId).catch(function (error) {
    return createAccount(googleId, firstName, lastName);
  });
}

function getAccount(accountId) {
  return findById(accountId).then(_converters.convertAccount);
}

function findById(accountId) {
  return _models.Account.findOne({ _id: accountId }).then(function (account) {
    if (account) {
      return account;
    } else {
      throw 'Account not found';
    }
  }).catch(function (error) {
    console.log(error);
    throw error;
  });
}

function findByGoogleId(googleId) {
  return _models.Account.findOne({ google_id: googleId }).then(function (account) {
    if (account) {
      return account._id;
    } else {
      throw 'Account not found';
    }
  });
}

function createAccount(googleId, firstName, lastName) {
  return new _models.Account({
    first_name: firstName,
    last_name: lastName,
    google_id: googleId
  }).save().then(function (account) {

    return new _models.Period({
      start_date: (0, _dateHelper.startOfThisMonth)()
    }).save().then(function (period) {
      account.current_period_id = period._id;
      return account.save();
    });
  });
}