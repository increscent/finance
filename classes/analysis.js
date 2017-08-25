var Budget = require('./budget');

class Analysis {
  constructor(budgets, credits, debits) {
    this.budgets = budgets;
    this.credits = credits;
    this.debits = debits;
  }

  getOverview() {
    var overview = [];
    for (var i = 0; i < this.budgets.length; i++) {
      var category = this.budgets[i].category;
      var debits = this.totalBudgetDebits(this.budgets[i]);
      var allowance = this.calcBudgetAllowance(this.budgets[i]);
      var balance = allowance - debits;
      var category_allowance = (this.budgets[i].allowance_type == '$'?'$':'') + this.budgets[i].allowance.toString() + (this.budgets[i].allowance_type == '%'?'%':'');
      overview.push({category: category, category_allowance: category_allowance, debits: debits, allowance: allowance, balance: balance});
    }

    var totalCredits = this.sumCollection(this.credits);
    var totalDebits = this.sumCollection(this.debits);
    var categoryAssociatedAllowance = 0;
    var categoryAssociatedDebits = 0;
    for (var i = 0; i < overview.length; i++) {
      categoryAssociatedAllowance += overview[i].allowance;
      categoryAssociatedDebits += overview[i].debits;
    }

    var category = 'Other';
    var debits = totalDebits - categoryAssociatedDebits;
    var allowance = totalCredits - categoryAssociatedAllowance;
    var balance = allowance - debits;
    var category_allowance = (totalCredits == 0)? '0%':Math.round(allowance / totalCredits * 100).toString() + '%';
    overview.push({category: category, category_allowance: category_allowance, debits: debits, allowance: allowance, balance: balance});

    return overview;
  }

  getHistory() {
    var credits = this.credits.map(x => {
      var credit = {
        category: x.category,
        motive: x.motive,
        amount: x.amount,
        date: x.date,
        type: 'credit'
      };
      return credit;
    });
    var debits = this.debits.map(x => {
      var debit = {
        category: x.category,
        motive: x.motive,
        amount: x.amount,
        date: x.date,
        type: 'debit'
      };
      return debit;
    });
    var collection = credits.concat(debits);
    collection.sort((a, b) => a.date - b.date);

    collection.forEach(x => {
      if (x.type == 'debit') {
        x.category = Budget.getCategoryById(this.budgets, x.category);
      }
    });

    return collection;
  }

  getBudgetBalance(budget) {
    return this.calcBudgetAllowance(budget) - this.totalBudgetDebits(budget);
  }

  totalBudgetDebits(budget) {
    return this.sumCollection(this.getBudgetDebits(budget));
  }

  totalBudgetCredits(budget) {
    return this.sumCollection(this.getBudgetCredits(budget));
  }

  getBudgetDebits(budget) {
    return this.debits.filter(x => x.category == budget._id && x.date >= budget.date);
  }

  getBudgetCredits(budget) {
    return this.credits.filter(x => x.date >= budget.date);
  }

  calcBudgetAllowance(budget) {
    var totalCredits = this.totalBudgetCredits(budget);
    if (budget.allowance_type == '%') {
      return budget.allowance / 100 * totalCredits;
    } else {
      var initialDate = new Date(budget.date);
      var currentDate = new Date();
      var initialDateMonths = initialDate.getMonth() + (12 * initialDate.getYear());
      var currentDateMonths = currentDate.getMonth() + (12 * currentDate.getYear());
      var activeMonths = currentDateMonths - initialDateMonths + 1;
      return budget.allowance * activeMonths;
    }
  }

  sumCollection(collection) {
    return collection.reduce((sum, x) => sum + x.amount, 0);
  }
}

module.exports = Analysis;
