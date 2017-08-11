class Budget {

}

Budget.findByCategory = function (budgets, category) {
  return budgets.find(x => x.category == category);
};

Budget.findById = function (budgets, id) {
  return budgets.find(x => x._id == id);
};

Budget.removeBudget = function (budgets, id) {
  var budget = this.findById(budgets, id);
  var index = budgets.indexOf(budget);
  budgets.splice(index, 1);
};

module.exports = Budget;
