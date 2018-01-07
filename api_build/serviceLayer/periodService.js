'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getPeriods = getPeriods;
exports.createPeriod = createPeriod;
exports.deleteCurrentPeriod = deleteCurrentPeriod;

var _models = require('../dataLayer/models');

var _converters = require('../dataLayer/converters');

var _dateHelper = require('./dateHelper');

function getPeriods(accountId) {
  return _models.Period.find({ account_id: accountId }).then(function (periods) {
    return periods.map(_converters.convertPeriod);
  });
}

function createPeriod(accountId) {
  return _models.Account.findOne({ _id: accountId }).then(function (account) {
    if (!account) throw { statusCode: 400, message: 'Account not found.' };

    return endPeriod(accountId, account.current_period_id).then(function () {
      return account;
    });
  }).then(function (account) {

    return new _models.Period({
      start_date: (0, _dateHelper.rightNow)(),
      account_id: accountId,
      previous_period_id: account.current_period_id
    }).save().then(function (newPeriod) {
      return [account, newPeriod];
    });
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        account = _ref2[0],
        newPeriod = _ref2[1];

    return updateAccountPeriod(account, newPeriod._id).then(function (account) {
      return newPeriod;
    });
  }).then(function (newPeriod) {

    return pullInUnusedCredits(accountId, newPeriod._id).then(function (totalCredits) {
      return [newPeriod, totalCredits];
    });
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        newPeriod = _ref4[0],
        totalCredits = _ref4[1];

    return initializeCategories(accountId, newPeriod, newPeriod.previous_period_id, totalCredits).then(function () {
      return newPeriod;
    });
  }).then(_converters.convertPeriod);
}

function deleteCurrentPeriod(accountId) {
  return _models.Account.findOne({ _id: accountId }).then(function (account) {
    if (!account) throw { statusCode: 400, message: 'Account not found.' };

    // find current period
    return _models.Period.findOne({
      _id: account.current_period_id,
      account_id: accountId
    }).then(function (currentPeriod) {
      if (!currentPeriod) throw { statusCode: 400, message: 'Period not found.' };

      return [account, currentPeriod];
    });
  }).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        account = _ref6[0],
        currentPeriod = _ref6[1];

    // set previous period as current period
    if (!currentPeriod.previous_period_id) throw { statusCode: 400, message: 'This period cannot be deleted' };

    return updateAccountPeriod(account, currentPeriod.previous_period_id).then(function (account) {
      return currentPeriod;
    });
  }).then(function (currentPeriod) {

    // find previous period
    return _models.Period.findOne({
      _id: currentPeriod.previous_period_id,
      account_id: accountId
    }).then(function (previousPeriod) {
      if (!previousPeriod) throw { statusCode: 400, message: 'Period not found.' };

      return [currentPeriod, previousPeriod];
    });
  }).then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        currentPeriod = _ref8[0],
        previousPeriod = _ref8[1];

    // remove all current categories
    return _models.Category.find({ period_id: currentPeriod._id }).then(function (categories) {
      return Promise.all(categories.map(function (category) {
        return category.remove();
      }));
    }).then(function () {
      return [currentPeriod, previousPeriod];
    });
  }).then(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        currentPeriod = _ref10[0],
        previousPeriod = _ref10[1];

    // move all current transactions
    return _models.Transaction.find({ period_id: currentPeriod._id, account_id: accountId }).then(function (transactions) {
      return Promise.all(transactions.map(function (transaction) {
        transaction.period_id = transactin.type === 'CREDIT' ? null : previousPeriod._id;
        transaction.category_id = null;
        return transaction.save();
      }));
    }).then(function () {
      return [currentPeriod, previousPeriod];
    });
  }).then(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        currentPeriod = _ref12[0],
        previousPeriod = _ref12[1];

    // remove end date from previous period and delete current period
    previousPeriod.end_date = null;
    return Promise.all([previousPeriod.save(), currentPeriod.remove()]);
  });
}

function endPeriod(accountId, periodId) {
  if (!periodId) return;
  return _models.Period.findOne({ _id: periodId, account_id: accountId }).then(function (period) {
    if (!period) return;
    period.end_date = (0, _dateHelper.rightNow)();
    return period.save();
  });
}

function updateAccountPeriod(account, newPeriodId) {
  account.current_period_id = newPeriodId;
  return account.save();
}

function pullInUnusedCredits(accountId, newPeriodId) {
  return _models.Transaction.find({ type: 'CREDIT', period_id: null, account_id: accountId }).then(function (transactions) {
    return Promise.all(transactions.map(function (transaction) {
      transaction.period_id = newPeriodId;
      return transaction.save();
    }));
  }).then(function (transactions) {
    return transactions.reduce(function (acc, t) {
      return acc + t.amount;
    }, 0);
  });
}

function initializeCategories(accountId, newPeriodId, pastPeriodId, totalCredits) {
  if (!pastPeriodId) return;
  return _models.Category.find({ period_id: pastPeriodId, account_id: accountId }).then(function (categories) {
    return Promise.all(categories.map(function (category) {
      var newAmount = category.allowance_type === '%' ? totalCredits * category.allowance / 100 : category.allowance;
      return new _models.Category({
        account_id: accountId,
        period_id: newPeriodId,
        name: category.name,
        allowance: category.allowance,
        allowance_type: category.allowance_type,
        current_limit: newAmount
      }).save();
    }));
  });
}