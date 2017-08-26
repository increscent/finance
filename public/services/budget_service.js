import ApiService from './api_service.js';
import ListenerService from './listener_service.js';
import Store from '../store.js';

class BudgetService extends ListenerService {
  constructor() {
    super();
    this.budgets = [];
    this.fetchBudgets();

    this.update = this.update.bind(this);
    Store.registerListener(this.update);
  }

  update() {
    this.budgets = Store.budgets;
    this.notifyListeners();
  }

  fetchBudgets() {
    ApiService.getRequest('/api/budget/budgets')
    .then(data => {
      Store.setStore('budgets', data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  addBudget(budget, callback) {
    ApiService.putRequest('/api/budget', budget)
    .then(data => {
      insertBudget(data, this.budgets);
      Store.setStore('budgets', this.budgets, true);
      callback(null);
    })
    .catch(error => {
      callback(error.toString());
    });
  }
}

export default new BudgetService();

function insertBudget(budget, collection) {
  collection.push(budget);
}
