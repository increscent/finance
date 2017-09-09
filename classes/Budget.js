var Models = require('../models');
var Analysis = require('../classes/Analysis');
var config = require('../config');

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
      // update
    } else {
      return this.create(newBudget);
    }
  }

  create(newBudget) {
    return Promise.resolve().then(() => {
      if (!this.isValidName(newBudget.name)) throw new Error("Invalid Budget Name");

      return (new Models.Budget(newBudget)).save();
    });
  }

  // save(new_budget, callback) {
  //   if (this.budget) {
  //   } else {
  //     // budget must be created
  //     if (!this.isValidName(new_budget.name)) return callback('Invalid Name');
  //     this.budget = new Models.Budget(new_budget);
  //     budget.save()
  //     .then(budget => {
  //       callback(null, budget);
  //     })
  //     .catch(() => callback('Database Error.'));
  //   }
  // }
  //
  // handleChangedBudgetName(current_budget, new_budget, callback) {
  //   if (new_budget.name != current_budget.name && this.isValidName(new_budget.name)) {
  //     // name has changed
  //     current_budget.name = new_budget.name;
  //     current_budget.save()
  //     .then(budget => {
  //       console.log(budget);
  //       console.log(current_budget);
  //       for (var i = 0; i < this.transactions.length; i++) {
  //         if (this.transactions[i].from == current_budget.name) {
  //           this.transactions[i].from = new_budget.name;
  //           this.transactions[i].save();
  //         } else if (this.transactions[i].to == current_budget.name) {
  //           this.transactions[i].to = new_budget.name;
  //           this.transactions[i].save();
  //         }
  //       }
  //       callback(null, budget);
  //     })
  //     .catch(() => callback('Database Error.'));
  //   } else {
  //     // name has not changed
  //     return callback(null, current_budget)
  //   }
  // }
  //
  // handleChangedBudgetAllowance(current_budget, new_budget, callback) {
  //   if (new_budget.allowance_type != current_budget.allowance_type || new_budget.allowance != current_budget.allowance) {
  //     // allowance has changed
  //     var amountBudgetHasReceived = current_budget.allowance;
  //     var analysis = new Analysis(this.budgets, this.transactions);
  //     var totalAccountCredits = analysis.getTotalAccountCredits();
  //     if (current_budget.allowance_type == '%') {
  //       amountBudgetHasReceived = totalAccountCredits * current_budget.allowance / 100;
  //     }
  //
  //     var amountBudgetShouldReceive = new_budget.allowance;
  //     if (new_budget.allowance_type == '%') {
  //       amountBudgetShouldReceive = totalAccountCredits * new_budget.allowance / 100;
  //     }
  //
  //     current_budget.allowance_type = new_budget.allowance_type == '%'? '%':'$';
  //     current_budget.allowance = new_budget.allowance;
  //     current_budget.save()
  //     .then(budget => {
  //       this.balanceNewBudget(budget, amountBudgetHasReceived, amountBudgetShouldReceive, error => {
  //         if (error) return callback(error);
  //         return callback(null, budget);
  //       });
  //     })
  //     .catch(() => callback('Database Error.'));
  //   } else {
  //     // allowance has not changed
  //     return callback(null, current_budget);
  //   }
  // }
  //
  // balanceNewBudget(budget, amountBudgetHasReceived, amountBudgetShouldReceive, callback){
  //   // amount must always be positive
  //   var from = (amountBudgetShouldReceive > amountBudgetHasReceived)? 'Other':budget.name;
  //   var to = (from == 'Other')? budget.name:'Other';
  //   var amount = amountBudgetShouldReceive - amountBudgetHasReceived;
  //   if (amount < 0) amount *= -1;
  //   var offsetTransaction = new Transaction(this.account, this.budgets, {
  //     from: from,
  //     to: to,
  //     motive: 'Budget Allocations',
  //     amount: amount,
  //     date: Date.now(),
  //     account_id: this.account.id
  //   });
  //   offsetTransaction.save()
  //   .then(transaction => callback(null, transaction))
  //   .catch(() => callback('Database Error.'));
  // }
  //
  // delete(callback) {
  //   if (!this.budget) return callback('Budget Does Not Exist.');
  //
  //   this.budget.remove()
  //   .then(() => {
  //     for (var i = 0; i < this.transactions.length; i++) {
  //       // All debits will be accredited to 'Other'
  //       if (this.transactions[i].from == this.budget.name) {
  //         this.transactions[i].from = 'Other';
  //         this.transactions[i].save();
  //       }
  //       // All credits will go to 'Other' (unless they come from 'Other', in which case they are removed)
  //       else if (this.transactions[i].to == this.budget.name) {
  //         if (this.transactions[i].from == 'Other') {
  //           this.transactions[i].remove();
  //         } else {
  //           this.transactions[i].to = 'Other';
  //           this.transactions[i].save();
  //         }
  //       }
  //     }
  //
  //     callback(null);
  //   })
  //   .catch(() => callback('Database Error.'));
  // }

  isValidName(budgetName) {
    // make list of current budgets
    var currentBudgets = config.reserved_budget_names.map(x => {return {name: x}}).concat(this.budgets);

    return currentBudgets.findIndex(x => x.name.trim().toLowerCase() == budgetName.trim().toLowerCase()) == -1;
  }
}

module.exports = Budget;
