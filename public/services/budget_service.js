import ApiService from './api_service.js';
import ListenerService from './listener_service.js';
import AnalysisService from './analysis_service.js';

class BudgetService extends ListenerService {
  constructor() {
    super();
    this.budgets = [];
    this.fetchBudgets();
  }

  fetchBudgets() {
    ApiService.getRequest('/api/budget/budgets')
    .then(data => {
      this.budgets = data;
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }

  addBudget(budget, callback) {
    ApiService.putRequest('/api/budget', budget)
    .then(data => {
      insertBudget(data, this.budgets);
      this.notifyListeners();
      AnalysisService.fetchOverview();
      callback(null);
    })
    .catch(error => {
      callback(error.toString());
    });
  }
}

export default (new BudgetService());

function insertBudget(budget, collection) {
  collection.push(budget);
}
