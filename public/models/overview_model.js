export default class OverviewModel {
  constructor() {
    this.budgets = [];
    /*this.budgets = [ { category: 'Tithing',
        category_allowance: '10%',
        debits: 15,
        allowance: 16,
        balance: 1 },
      { category: 'Giving',
        category_allowance: '10%',
        debits: 0,
        allowance: 16,
        balance: 16 },
      { category: 'Food',
        category_allowance: '$100',
        debits: 80,
        allowance: 100,
        balance: 20 },
      { category: 'Other',
        category_allowance: '18%',
        debits: 20,
        allowance: 28,
        balance: 8 } ];*/
  }

  updateBudgets(budgets) {
    this.budgets = budgets;
  }
}
