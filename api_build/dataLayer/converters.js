"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var convertAccount = exports.convertAccount = function convertAccount(dbAccount) {
  return {
    firstName: dbAccount.first_name,
    lastName: dbAccount.last_name,
    currentPeriodId: dbAccount.current_period_id
  };
};

var convertPeriod = exports.convertPeriod = function convertPeriod(dbPeriod) {
  return {
    periodId: dbPeriod._id,
    startDate: dbPeriod.start_date,
    endDate: dbPeriod.end_date
  };
};

var convertCategory = exports.convertCategory = function convertCategory(dbCategory) {
  return {
    categoryId: dbCategory._id,
    periodId: dbCategory.period_id,
    name: dbCategory.name,
    allowance: dbCategory.allowance,
    allowanceType: dbCategory.allowance_type,
    currentLimit: dbCategory.current_limit
  };
};

var convertTransaction = exports.convertTransaction = function convertTransaction(dbTransaction) {
  return {
    transactionId: dbTransaction._id,
    periodId: dbTransaction.period_id,
    categoryId: dbTransaction.category_id,
    type: dbTransaction.type,
    note: dbTransaction.note,
    amount: dbTransaction.amount,
    date: dbTransaction.date
  };
};