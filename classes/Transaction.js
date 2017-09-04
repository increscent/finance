var Models = require('../models');
var DateHelper = require('../classes/DateHelper');
var config = require('../config');

class Transaction {
  constructor(account, budgets, transaction) {
    this.account = account;
    this.budgets = budgets;
    this.transaction = new Models.Transaction(transaction);

    // make list of available endpoints
    this.availableEndpoints = config.reserved_budget_names.map(x => {return {name: x}}).concat(this.budgets);
  }

  save(callback) {
    if (!this.hasValidEndpoints()) return callback('Invalid Transaction Endponts');

    this.transaction.save()
    .then(transaction => {
      if (transaction.from == '@Credit' && transaction.to == 'Other') {
        for (var i = 0; i < this.budgets.length; i++) {
          if (this.budgets[i].allowance_type == '%') {
            var new_transaction = new Models.Transaction({
              from: 'Other',
              to: this.budgets[i].name,
              motive: 'Budget Allocations',
              amount: transaction.amount * this.budgets[i].allowance / 100,
              date: Date.now(),
              account_id: this.account.id
            });
            new_transaction.save();
          }
        }
      }
      return callback(null, transaction);
    })
    .catch(error => callback('Database Error'));
  }

  hasValidEndpoints() {
    return (this.availableEndpoints.findIndex(x => x.name == this.transaction.to) > -1
      && this.availableEndpoints.findIndex(x => x.name == this.transaction.from) > -1);
  }
}

module.exports = Transaction;
