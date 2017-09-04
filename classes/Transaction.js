var Models = require('../models');
var DateHelper = require('../classes/DateHelper');
var config = require('../config');

class Transaction {
  constructor(account, budgets, transaction) {
    this.account = account;
    this.budgets = budgets;
    this.transaction = transaction;

    // make list of available endpoints
    this.availableEndpoints = config.reserved_budget_names.map(x => {return {name: x}}).concat(this.budgets);
  }

  hasValidEndpoints() {
    return (this.availableEndpoints.findIndex(x => x.name == this.transaction.to) > -1
      && this.availableEndpoints.findIndex(x => x.name == this.transaction.from) > -1);
  }
}

module.exports = Transaction;
