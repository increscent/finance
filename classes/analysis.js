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
      var balance = this.getBudgetBalance(this.budgets[i]);
      overview.push({category: category, debits: debits, allowance: allowance, balance: balance});
    }
    return overview;
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
      var activeMonths = currentDateMonths - initialDateMonths;
      return budget.allowance * activeMonths;
    }
  }

  sumCollection(collection) {
    var total = 0;
    for (var i in collection) {
      total += collection[i].amount;
    }
    return total;
  }
}

module.exports = Analysis;
