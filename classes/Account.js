var Models = require('../models');
var DateHelper = require('../classes/DateHelper');

class Account {
  constructor(account, budgets) {
    this.account = account;
    this.budgets = budgets;
  }

  find(googleId) {
    return Models.Account.findOne({google_id: googleId});
  }

  findOrCreate(googleId, firstName, lastName) {
    return Models.Account.findOne({google_id: googleId})
    .then(account => {
      if (account) {
        return account;
      } else {
        let newAccount = new Models.Account({
          first_name: firstName,
          last_name: lastName,
          budget_period_start: DateHelper.startOfThisMonth(),
          budget_period_end: DateHelper.startOfNextMonth(),
          google_id: googleId
        });
        return newAccount.save();
      }
    });
  }

  startNewPeriod(callback) {
    this.account.budget_period_start = DateHelper.startOfThisMonth();
    this.account.budget_period_end = DateHelper.startOfNextMonth();
    this.account.save()
    .then(account => {
      for (var i in this.budgets) {
        if (this.budgets[i].allowance_type == '$') {
          var transaction = new Models.Transaction({
            from: 'Other',
            to: this.budgets[i].name,
            motive: 'Budget Allocations',
            amount: this.budgets[i].allowance,
            date: Date.now(),
            account_id: this.account.id
          });
          transaction.save();
        }
      }
      callback(null, account);
    })
    .catch(error => {
      console.log(error)
      callback(true);
    });
  }
}

module.exports = Account;
