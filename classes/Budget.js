var Models = require('../models');
var Transaction = require('../classes/Transaction');
var config = require('../config/route_config');

class Budget {
  constructor(account, budgets, name, transactions) {
    this.account = account;
    this.budgets = budgets;
    this.name = name;
    this.transactions = transactions;
  }

  updateOrCreate(newBudget) {
    var existingBudget = this.budgets.find(x => x.name == this.name);
    if (existingBudget) {
      return this.update(existingBudget, newBudget);
    } else {
      return this.create(newBudget);
    }
  }

  delete() {
    var existingBudget = this.budgets.find(x => x.name == this.name);

    return Promise.resolve()
    .then(() => {
      if (!existingBudget) throw new Error("400Budget Not Found");

      // change all transaction associated with this budget
      let filterTransaction = transaction => {
        return transaction.to == existingBudget.name || transaction.from == existingBudget.name;
      };

      let updateTransaction = transaction => {
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

      return Promise.all(this.transactions
        .filter(filterTransaction)
        .map(updateTransaction)
      );
    })
    .then(() => {
      // remove budget
      return existingBudget.remove();
    });
  }

  create(newBudget) {
    return Promise.resolve()
    .then(() => {
      if (!this.isValidName(newBudget.name)) throw new Error("400Invalid Budget Name");

      var budget = new Models.Budget(newBudget);
      this.budgets.push(budget);
      return budget;
    })
    .then(budget => {
      // add beginning funds
      var shouldReceive = this.calcShouldReceive(budget);
      return this.balanceBudgetTransaction(budget.name, shouldReceive).then(() => budget); // make sure the original budget is returned after it is balanced
    })
    .then(budget => {
      return budget.save();
    });
  }

  update(existingBudget, newBudget) {
    return Promise.resolve()
    .then(() => {
      // check for changed budget name
      if (existingBudget.name == newBudget.name) return;
      if (!this.isValidName(newBudget.name)) throw new Error("400Invalid Budget Name");

      let filterTransaction = transaction => {
        return transaction.to == existingBudget.name || transaction.from == existingBudget.name;
      };

      let updateTransaction = transaction => {
        if (transaction.to == existingBudget.name) {
          transaction.to = newBudget.name;
        }
        if (transaction.from == existingBudget.name) {
          transaction.from = newBudget.name;
        }
        return transaction.save();
      };

      return Promise.all(this.transactions
        .filter(filterTransaction)
        .map(updateTransaction)
      );
    })
    .then(() => {
      // change the budget's name after all transactions have been updated
      existingBudget.name = newBudget.name;
    })
    .then(() => {
      // check for changed budget amount
      if (existingBudget.allowance_type == newBudget.allowance_type && existingBudget.allowance == newBudget.allowance) return;

      // remove other budget additions
      var transactionsToRemove = this.transactions
      .filter(transaction => {
        return transaction.from == 'Other' && transaction.to == existingBudget.name;
      })
      .map(transaction => {
        return transaction.remove();
      });

      var shouldReceive = this.calcShouldReceive(newBudget);
      var balanceBudgetTransaction = this.balanceBudgetTransaction(existingBudget.name, shouldReceive);

      return Promise.all(transactionsToRemove.concat([balanceBudgetTransaction]));
    })
    .then(() => {
      // change budget allowance
      existingBudget.allowance_type = newBudget.allowance_type;
      existingBudget.allowance = newBudget.allowance;
    })
    .then(() => {
      // save budget
      return existingBudget.save();
    });
  }

  calcHasReceived(budget) {
    var hasReceived = this.transactions
    .filter(transaction => {
      return transaction.from == 'Other' && transaction.to == budget.name;
    })
    .reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);
    return hasReceived;
  }

  calcShouldReceive(budget) {
    var shouldReceive;
    if (budget.allowance_type == '$') {
      shouldReceive = budget.allowance;
    } else {
      shouldReceive = budget.allowance / 100 * this.transactions
      .filter(transaction => {
        return transaction.from == '@Credit' && transaction.to == 'Other';
      })
      .reduce((sum, transaction) => {
        return sum + transaction.amount
      }, 0);
    }
    return shouldReceive;
  }

  balanceBudgetTransaction(name, shouldReceive) {
    return Promise.resolve().then(() => {
      if (shouldReceive == 0) return;

      var balancingTransaction = new Transaction(this.account, this.budgets);
      return balancingTransaction.create({
        from: 'Other',
        to: name,
        amount: shouldReceive,
        motive: 'Budget Balancing'
      });
    });
  }

  isValidName(budgetName) {
    // make list of current budgets
    var currentBudgets = config.reserved_budget_names.map(x => {return {name: x}}).concat(this.budgets);

    return currentBudgets.findIndex(x => x.name.trim().toLowerCase() == budgetName.trim().toLowerCase()) == -1;
  }
}

module.exports = Budget;
