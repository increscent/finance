var Models = require('../models');
var DateHelper = require('../classes/DateHelper');
var config = require('../config/route_config');

class Transaction {
  constructor(account, budgets) {
    this.account = account;
    this.budgets = budgets;
  }

  delete(transaction_id) {
    return Models.Transaction.findOne({_id: transaction_id, account_id: this.account.id})
    .then(transaction => {
      if (!transaction) throw new Error('404Transaction Not Found');
      return transaction.remove();
    });
  }

  update(newTransaction) {
    return Models.Transaction.findOne({_id: newTransaction._id, account_id: this.account.id})
    .then(transaction => {
      if (!transaction) throw new Error('404Transaction Not Found');
      transaction.from = newTransaction.from;
      transaction.to = newTransaction.to;
      transaction.amount = newTransaction.amount;
      transaction.motive = newTransaction.motive;
      return transaction.save();
    });
  }

  create(newTransaction) {
    if (!this.hasValidEndpoints(newTransaction)) throw new Error('400Invalid Transaction Endpoints: ' + newTransaction.from + ' -> ' + newTransaction.to);

    return (new Models.Transaction({
      from: newTransaction.from,
      to: newTransaction.to,
      amount: newTransaction.amount,
      motive: newTransaction.motive,
      date: Date.now(),
      account_id: this.account.id
    }))
    .save()
    .then(transaction => {
      if (transaction.from == '@Credit' && transaction.to == 'Other') {
        // this is a credit to the account--update all budgets with percentage allowance_type's
        return this.handleCredit(transaction);
      }
      return transaction;
    });
  }

  handleCredit(transaction) {
    let filterBudgets = budget => {
      return budget.allowance_type == '%';
    };

    let creditToBudgets = budget => {
      return this.create({
        from: 'Other',
        to: budget.name,
        amount: budget.allowance / 100 * transaction.amount,
        motive: 'Budget Allocations'
      });
    };

    return Promise
    .all(this.budgets
      .filter(filterBudgets)
      .map(creditToBudgets)
    )
    .then(() => transaction);
  }

  hasValidEndpoints(transaction) {
    // make list of available endpoints
    var availableEndpoints = config.reserved_budget_names.map(x => {return {name: x}}).concat(this.budgets);

    return (availableEndpoints.findIndex(x => x.name == transaction.to) > -1
      && availableEndpoints.findIndex(x => x.name == transaction.from) > -1);
  }
}

module.exports = Transaction;
