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
          google_id: googleId
        });
        return newAccount.save();
      }
    });
  }

  startNewPeriod() {
    this.account.past_budget_periods.push({
      start_date: this.account.budget_period_start,
      end_date: DateHelper.rightNow()
    });
    this.account.budget_period_start = DateHelper.rightNow();
    this.account.markModified('past_budget_periods');

    return this.account.save()
    .then(account => {
      let filterBudgets = budget => {
        return budget.allowance_type == '$';
      };

      let addTransaction = budget => {
        let transaction = new Models.Transaction({
          from: 'Other',
          to: budget.name,
          motive: 'Budget Allocations',
          amount: budget.allowance,
          date: DateHelper.rightNow(),
          account_id: this.account.id
        });
        return transaction.save();
      };

      return Promise.all(this.budgets
        .filter(filterBudgets)
        .map(addTransaction)
      );
    });
  }
}

module.exports = Account;
