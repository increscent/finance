class Budget {
  findByCategory(budgets, category) {
    return budgets.find(x => x.category == category);
  }

  findById(budgets, id) {
    return budgets.find(x => x._id == id);
  }

  getCategoryById(budgets, id) {
    var budget = this.findById(budgets, id);
    if (budget) {
      return budget.category;
    } else {
      return 'Other';
    }
  }

  removeBudget(budgets, id) {
    var budget = this.findById(budgets, id);
    var index = budgets.indexOf(budget);
    budgets.splice(index, 1);
  }

  replaceBudget(budgets, new_budget, id) {
    var budget = this.findById(budgets, id);
    var index = budgets.indexOf(budget);
    if (index < 0) return;
    budgets[index] = new_budget;
  }
}

module.exports = new Budget();
