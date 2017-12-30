'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
      throw { statusCode: 400, message: 'Account not found' };
    }
  });
}

function findByGoogleId(googleId) {
  return _models.Account.findOne({ google_id: googleId }).then(function (account) {
    if (account) {
      return account._id;
    } else {
      throw { statusCode: 400, message: 'Account not found' };
    }
  });
}

function createAccount(googleId, firstName, lastName) {
  var newAccountPromise = new _models.Account({
    first_name: firstName,
    last_name: lastName,
    google_id: googleId
  }).save();

  var newPeriodPromise = new _models.Period({
    start_date: (0, _dateHelper.startOfThisMonth)()
  }).save();

  return Promise.all([newAccountPromise, newPeriodPromise]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        newAccount = _ref2[0],
        newPeriod = _ref2[1];

    newAccount.current_period_id = newPeriod._id;
    newPeriod.account_id = newAccount._id;

    return Promise.all([newAccount.save(), newPeriod.save()]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        newAccount = _ref4[0],
        newPeriod = _ref4[1];

    return newAccount._id;
  });
}