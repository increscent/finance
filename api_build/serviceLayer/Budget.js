'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Models = require('../models');
var Transaction = require('../classes/Transaction');
var config = require('../config/route_config');

var Budget = function () {
  function Budget(account, budgets, name, transactions) {
    _classCallCheck(this, Budget);

    this.account = account;
    this.budgets = budgets;
    this.name = name;
    this.transactions = transactions;
  }

  _createClass(Budget, [{
    key: 'updateOrCreate',
    value: function updateOrCreate(newBudget) {
      var _this = this;

      var existingBudget = this.budgets.find(function (x) {
        return x.name == _this.name;
      });
      if (existingBudget) {
        return this.update(existingBudget, newBudget);
      } else {
        return this.create(newBudget);
      }
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this2 = this;

      var existingBudget = this.budgets.find(function (x) {
        return x.name == _this2.name;
      });

      return Promise.resolve().then(function () {
        if (!existingBudget) throw new Error("400Budget Not Found");

        // change all transaction associated with this budget
        var filterTransaction = function filterTransaction(transaction) {
          return transaction.to == existingBudget.name || transaction.from == existingBudget.name;
        };

        var updateTransaction = function updateTransaction(transaction) {
          if (transaction.to == existingBudget.name) {
            transaction.to = 'Other';
          }
          if (transaction.from == existingBudget.name) {
            transaction.from = 'Other';
          }
          if (transaction.from == transaction.to) {
            return transaction.remove();
          } else {
            return transaction.save();
          }
        };

        return Promise.all(_this2.transactions.filter(filterTransaction).map(updateTransaction));
      }).then(function () {
        // remove budget
        return existingBudget.remove();
      });
    }
  }, {
    key: 'create',
    value: function create(newBudget) {
      var _this3 = this;

      return Promise.resolve().then(function () {
        if (!_this3.isValidName(newBudget.name)) throw new Error("400Invalid Budget Name");

        var budget = new Models.Budget(newBudget);
        _this3.budgets.push(budget);
        return budget;
      }).then(function (budget) {
        // add beginning funds
        var shouldReceive = _this3.calcShouldReceive(budget);
        return _this3.balanceBudgetTransaction(budget.name, shouldReceive).then(function () {
          return budget;
        }); // make sure the original budget is returned after it is balanced
      }).then(function (budget) {
        return budget.save();
      });
    }
  }, {
    key: 'update',
    value: function update(existingBudget, newBudget) {
      var _this4 = this;

      return Promise.resolve().then(function () {
        // check for changed budget name
        if (existingBudget.name == newBudget.name) return;
        if (!_this4.isValidName(newBudget.name)) throw new Error("400Invalid Budget Name");

        var filterTransaction = function filterTransaction(transaction) {
          return transaction.to == existingBudget.name || transaction.from == existingBudget.name;
        };

        var updateTransaction = function updateTransaction(transaction) {
          if (transaction.to == existingBudget.name) {
            transaction.to = newBudget.name;
          }
          if (transaction.from == existingBudget.name) {
            transaction.from = newBudget.name;
          }
          return transaction.save();
        };

        return Promise.all(_this4.transactions.filter(filterTransaction).map(updateTransaction));
      }).then(function () {
        // change the budget's name after all transactions have been updated
        existingBudget.name = newBudget.name;
      }).then(function () {
        // check for changed budget amount
        if (existingBudget.allowance_type == newBudget.allowance_type && existingBudget.allowance == newBudget.allowance) return;

        // remove other budget additions
        var transactionsToRemove = _this4.transactions.filter(function (transaction) {
          return transaction.from == 'Other' && transaction.to == existingBudget.name;
        }).map(function (transaction) {
          return transaction.remove();
        });

        var shouldReceive = _this4.calcShouldReceive(newBudget);
        var balanceBudgetTransaction = _this4.balanceBudgetTransaction(existingBudget.name, shouldReceive);

        return Promise.all(transactionsToRemove.concat([balanceBudgetTransaction]));
      }).then(function () {
        // change budget allowance
        existingBudget.allowance_type = newBudget.allowance_type;
        existingBudget.allowance = newBudget.allowance;
      }).then(function () {
        // save budget
        return existingBudget.save();
      });
    }
  }, {
    key: 'calcHasReceived',
    value: function calcHasReceived(budget) {
      var hasReceived = this.transactions.filter(function (transaction) {
        return transaction.from == 'Other' && transaction.to == budget.name;
      }).reduce(function (sum, transaction) {
        return sum + transaction.amount;
      }, 0);
      return hasReceived;
    }
  }, {
    key: 'calcShouldReceive',
    value: function calcShouldReceive(budget) {
      var shouldReceive;
      if (budget.allowance_type == '$') {
        shouldReceive = budget.allowance;
      } else {
        shouldReceive = budget.allowance / 100 * this.transactions.filter(function (transaction) {
          return transaction.from == '@Credit' && transaction.to == 'Other';
        }).reduce(function (sum, transaction) {
          return sum + transaction.amount;
        }, 0);
      }
      return shouldReceive;
    }
  }, {
    key: 'balanceBudgetTransaction',
    value: function balanceBudgetTransaction(name, shouldReceive) {
      var _this5 = this;

      return Promise.resolve().then(function () {
        if (shouldReceive == 0) return;

        var balancingTransaction = new Transaction(_this5.account, _this5.budgets);
        return balancingTransaction.create({
          from: 'Other',
          to: name,
          amount: shouldReceive,
          motive: 'Budget Balancing'
        });
      });
    }
  }, {
    key: 'isValidName',
    value: function isValidName(budgetName) {
      // make list of current budgets
      var currentBudgets = config.reserved_budget_names.map(function (x) {
        return { name: x };
      }).concat(this.budgets);

      return currentBudgets.findIndex(function (x) {
        return x.name.trim().toLowerCase() == budgetName.trim().toLowerCase();
      }) == -1;
    }
  }]);

  return Budget;
}();

module.exports = Budget;