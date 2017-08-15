export default class OverviewModel {
  constructor() {
    this.budgets = [];
    this.FETCH_endpoint = '/api/analysis/overview';
  }

  update(budgets) {
    this.budgets = budgets;
  }
}
