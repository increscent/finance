export default class AddBudgetModel {
  constructor() {
    this.budgets = [];
    this.FETCH_endpoint = '/api/budget';
  }

  update(budgets) {
    this.budgets = budgets;
  }
}
