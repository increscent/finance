'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Models = require('../models');
var DateHelper = require('../classes/DateHelper');

var Account = function () {
  function Account(account, budgets) {
    _classCallCheck(this, Account);

    this.account = account;
    this.budgets = budgets;
  }

  _createClass(Account, [{
    key: 'find',
    value: function find(googleId) {
      return Models.Account.findOne({ google_id: googleId });
    }
  }, {
    key: 'findOrCreate',
    value: function findOrCreate(googleId, firstName, lastName) {
      return Models.Account.findOne({ google_id: googleId }).then(function (account) {
        if (account) {
          return account;
        } else {
          var newAccount = new Models.Account({
            first_name: firstName,
            last_name: lastName,
            budget_period_start: DateHelper.startOfThisMonth(),
            google_id: googleId
          });
          return newAccount.save();
        }
      });
    }
  }, {
    key: 'startNewPeriod',
    value: function startNewPeriod() {
      var _this = this;

      this.account.past_budget_periods.push({
        start_date: this.account.budget_period_start,
        end_date: DateHelper.rightNow()
      });
      this.account.budget_period_start = DateHelper.rightNow();
      this.account.markModified('past_budget_periods');

      return this.account.save().then(function (account) {
        var addBudget = function addBudget(budget) {
          var newBudget = new Models.Budget({
            name: budget.name,
            allowance: budget.allowance,
            allowance_type: budget.allowance_type,
            date: DateHelper.rightNow(),
            account_id: _this.account.id
          });
          return newBudget.save();
        };

        return Promise.all(_this.budgets.map(addBudget));
      }).then(function () {
        var filterBudgets = function filterBudgets(budget) {
          return budget.allowance_type == '$';
        };

        var addTransaction = function addTransaction(budget) {
          var transaction = new Models.Transaction({
            from: 'Other',
            to: budget.name,
            motive: 'Budget Allocations',
            amount: budget.allowance,
            date: DateHelper.rightNow(),
            account_id: _this.account.id
          });
          return transaction.save();
        };

        return Promise.all(_this.budgets.filter(filterBudgets).map(addTransaction));
      });
    }
  }]);

  return Account;
}();

module.exports = Account;