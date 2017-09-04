class Analysis {
  constructor(budgets, transactions) {
    this.budgets = budgets;
    this.budgets.push({
      name: 'Other'
    });
    this.transactions = transactions;
  }

  getOverview() {
    return this.budgets.map(budget => {
      var debits = this.getTotalBudgetDebits(budget);
      var credits = this.getTotalBudgetCredits(budget);
      return {
        name: budget.name,
        debits: debits,
        credits: credits,
        balance: credits - debits
      };
    });
  }

  getTotalBudgetDebits(budget) {
    return this.transactions.reduce((sum, transaction) => {
      if (transaction.from == budget.name) {
        return sum + transaction.amount;
      } else {
        return sum;
      }
    }, 0);
  }

  getTotalBudgetCredits(budget) {
    return this.transactions.reduce((sum, transaction) => {
      if (transaction.to == budget.name) {
        return sum + transaction.amount;
      } else {
        return sum;
      }
    }, 0);
  }
}

module.exports = Analysis;
