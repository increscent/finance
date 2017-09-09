class Analysis {
  constructor(budgets, transactions) {
    this.budgets = budgets;
    this.transactions = transactions;
  }

  getOverview() {
    var overview = this.budgets.map(budget => {
      var name = budget.name + ' (' + (budget.allowance_type == '$'?'$':'') + budget.allowance + (budget.allowance_type == '%'?'%':'') + ')'
      var credits = this.getTotalBudgetCredits(budget);
      var debits = this.getTotalBudgetDebits(budget);
      return {
        name: name,
        credits: credits,
        debits: debits,
        balance: credits - debits
      };
    });

    var otherCredits = this.getOtherBudgetCredits();
    var otherDebits = this.getOtherBudgetDebits();
    overview.push({
      name: 'Other',
      credits: otherCredits,
      debits: otherDebits,
      balance: otherCredits - otherDebits
    });

    var totalCredits = this.sumTransactions(this.transactions.filter(x => x.from == '@Credit'));
    var totalDebits = this.sumTransactions(this.transactions.filter(x => x.to == '@Debit'));
    overview.push({
      name: 'Total',
      credits: totalCredits,
      debits: totalDebits,
      balance: totalCredits - totalDebits
    });

    return overview;
  }

  sumTransactions(transactions) {
    return transactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);
  }

  getTotalBudgetCredits(budget) {
    return (this.sumTransactions(this.transactions.filter(x => x.to == budget.name))
      - this.getTotalRemovedFunds(budget));
  }

  getTotalBudgetDebits(budget) {
    return (this.sumTransactions(this.transactions.filter(x => x.from == budget.name))
      - this.getTotalRemovedFunds(budget));
  }

  getTotalRemovedFunds(budget) {
    return this.sumTransactions(this.transactions.filter(x => x.from == budget.name && x.to == 'Other'));
  }

  getTotalAccountCredits() {
    return this.sumTransactions(this.transactions.filter(x => x.from == '@Credit' && x.to == 'Other'));
  }

  getOtherBudgetCredits() {
    return (this.sumTransactions(this.transactions.filter(x => x.to == 'Other'))
      - this.sumTransactions(this.transactions.filter(x => x.from == 'Other' && x.to != '@Debit')));
  }

  getOtherBudgetDebits() {
    return this.sumTransactions(this.transactions.filter(x => x.from == 'Other' && x.to == '@Debit'));
  }
}

module.exports = Analysis;
