'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Analysis = function () {
  function Analysis(budgets, transactions) {
    _classCallCheck(this, Analysis);

    this.budgets = budgets;
    this.transactions = transactions;
  }

  _createClass(Analysis, [{
    key: 'getOverview',
    value: function getOverview() {
      var _this = this;

      var overview = this.budgets.map(function (budget) {
        var name = budget.name;
        var credits = _this.getTotalBudgetCredits(budget);
        var debits = _this.getTotalBudgetDebits(budget);
        return {
          name: name,
          credits: credits,
          debits: debits,
          balance: credits - debits
        };
      });

      var otherCredits = this.getOtherBudgetCredits();
      var otherDebits = this.getOtherBudgetDebits();
      overview.push({
        name: 'Other',
        credits: otherCredits,
        debits: otherDebits,
        balance: otherCredits - otherDebits
      });

      var totalCredits = this.sumTransactions(this.transactions.filter(function (x) {
        return x.from == '@Credit';
      }));
      var totalDebits = this.sumTransactions(this.transactions.filter(function (x) {
        return x.to == '@Debit';
      }));
      overview.push({
        name: 'Total',
        credits: totalCredits,
        debits: totalDebits,
        balance: totalCredits - totalDebits
      });

      return overview;
    }
  }, {
    key: 'sumTransactions',
    value: function sumTransactions(transactions) {
      return transactions.reduce(function (sum, transaction) {
        return sum + transaction.amount;
      }, 0);
    }
  }, {
    key: 'getTotalBudgetCredits',
    value: function getTotalBudgetCredits(budget) {
      return this.sumTransactions(this.transactions.filter(function (x) {
        return x.to == budget.name;
      })) - this.getTotalRemovedFunds(budget);
    }
  }, {
    key: 'getTotalBudgetDebits',
    value: function getTotalBudgetDebits(budget) {
      return this.sumTransactions(this.transactions.filter(function (x) {
        return x.from == budget.name;
      })) - this.getTotalRemovedFunds(budget);
    }
  }, {
    key: 'getTotalRemovedFunds',
    value: function getTotalRemovedFunds(budget) {
      return this.sumTransactions(this.transactions.filter(function (x) {
        return x.from == budget.name && x.to == 'Other';
      }));
    }
  }, {
    key: 'getTotalAccountCredits',
    value: function getTotalAccountCredits() {
      return this.sumTransactions(this.transactions.filter(function (x) {
        return x.from == '@Credit' && x.to == 'Other';
      }));
    }
  }, {
    key: 'getOtherBudgetCredits',
    value: function getOtherBudgetCredits() {
      return this.sumTransactions(this.transactions.filter(function (x) {
        return x.to == 'Other';
      })) - this.sumTransactions(this.transactions.filter(function (x) {
        return x.from == 'Other' && x.to != '@Debit';
      }));
    }
  }, {
    key: 'getOtherBudgetDebits',
    value: function getOtherBudgetDebits() {
      return this.sumTransactions(this.transactions.filter(function (x) {
        return x.from == 'Other' && x.to == '@Debit';
      }));
    }
  }]);

  return Analysis;
}();

module.exports = Analysis;