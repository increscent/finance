'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactions = getTransactions;
exports.addTransaction = addTransaction;
exports.updateTransaction = updateTransaction;
exports.deleteTransaction = deleteTransaction;

var _models = require('../dataLayer/models');

var _converters = require('../dataLayer/converters');

function getTransactions(accountId, periodId) {
  return _models.Transaction.find({
    account_id: accountId,
    $or: [{ period_id: periodId }, { period_id: null }]
  }).then(function (transactions) {
    return transactions.map(_converters.convertTransaction);
  });
}

function addTransaction(accountId, request) {
  return new _models.Transaction({
    account_id: accountId,
    period_id: request.periodId,
    category_id: request.categoryId ? request.categoryId : undefined,
    type: request.type.trim() === 'CREDIT' ? 'CREDIT' : 'DEBIT',
    note: request.note,
    amount: parseFloat(request.amount),
    date: request.date
  }).save().then(function (transaction) {

    if (transaction.type === 'CREDIT' && transaction.period_id) {
      // add percentage of credit to categories in this period
      return _models.Category.find({ account_id: accountId, period_id: transaction.period_id, allowance_type: '%' }).then(function (categories) {
        return Promise.all(categories.map(function (category) {
          category.current_limit += category.allowance * transaction.amount / 100;
          return category.save();
        }));
      }).then(function () {
        return transaction;
      });
    } else {
      return transaction;
    }
  }).then(_converters.convertTransaction);
}

function updateTransaction(accountId, transactionId, request) {
  return getTransaction(accountId, transactionId).then(function (transaction) {
    if (request.periodId !== undefined) transaction.period_id = request.periodId;
    if (request.categoryId !== undefined) transaction.category_id = request.categoryId;
    if (request.type !== undefined) transaction.type = request.type.trim() === 'CREDIT' ? 'CREDIT' : 'DEBIT';
    if (request.note !== undefined) transaction.note = request.note;
    if (request.amount !== undefined) transaction.amount = parseFloat(request.amount);
    if (request.date !== undefined) transaction.date = request.date;
    return transaction.save();
  });
}

function deleteTransaction(accountId, transactionId) {
  return getTransaction(accountId, transactionId).then(function (transaction) {
    return transaction.remove();
  });
}

function getTransaction(accountId, transactionId) {
  return _models.Transaction.findOne({ account_id: accountId, _id: transactionId }).then(function (transaction) {
    if (transaction) {
      return transaction;
    } else {
      throw { statusCode: 400, message: 'Transaction not found.' };
    }
  });
}