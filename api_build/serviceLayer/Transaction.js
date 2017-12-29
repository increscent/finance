'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Models = require('../models');
var DateHelper = require('../classes/DateHelper');
var config = require('../config/route_config');

var Transaction = function () {
  function Transaction(account, budgets) {
    _classCallCheck(this, Transaction);

    this.account = account;
    this.budgets = budgets;
  }

  _createClass(Transaction, [{
    key: 'delete',
    value: function _delete(transaction_id) {
      return Models.Transaction.findOne({ _id: transaction_id, account_id: this.account.id }).then(function (transaction) {
        if (!transaction) throw new Error('404Transaction Not Found');
        return transaction.remove();
      });
    }
  }, {
    key: 'update',
    value: function update(newTransaction) {
      return Models.Transaction.findOne({ _id: newTransaction._id, account_id: this.account.id }).then(function (transaction) {
        if (!transaction) throw new Error('404Transaction Not Found');
        transaction.from = newTransaction.from;
        transaction.to = newTransaction.to;
        transaction.amount = newTransaction.amount;
        transaction.motive = newTransaction.motive;
        return transaction.save();
      });
    }
  }, {
    key: 'create',
    value: function create(newTransaction) {
      var _this = this;

      if (!this.hasValidEndpoints(newTransaction)) throw new Error('400Invalid Transaction Endpoints: ' + newTransaction.from + ' -> ' + newTransaction.to);

      return new Models.Transaction({
        from: newTransaction.from,
        to: newTransaction.to,
        amount: newTransaction.amount,
        motive: newTransaction.motive,
        date: Date.now(),
        account_id: this.account.id
      }).save().then(function (transaction) {
        if (transaction.from == '@Credit' && transaction.to == 'Other') {
          // this is a credit to the account--update all budgets with percentage allowance_type's
          return _this.handleCredit(transaction);
        }
        return transaction;
      });
    }
  }, {
    key: 'handleCredit',
    value: function handleCredit(transaction) {
      var _this2 = this;

      var filterBudgets = function filterBudgets(budget) {
        return budget.allowance_type == '%';
      };

      var creditToBudgets = function creditToBudgets(budget) {
        return _this2.create({
          from: 'Other',
          to: budget.name,
          amount: budget.allowance / 100 * transaction.amount,
          motive: 'Budget Allocations'
        });
      };

      return Promise.all(this.budgets.filter(filterBudgets).map(creditToBudgets)).then(function () {
        return transaction;
      });
    }
  }, {
    key: 'hasValidEndpoints',
    value: function hasValidEndpoints(transaction) {
      // make list of available endpoints
      var availableEndpoints = config.reserved_budget_names.map(function (x) {
        return { name: x };
      }).concat(this.budgets);

      return availableEndpoints.findIndex(function (x) {
        return x.name == transaction.to;
      }) > -1 && availableEndpoints.findIndex(function (x) {
        return x.name == transaction.from;
      }) > -1;
    }
  }]);

  return Transaction;
}();

module.exports = Transaction;