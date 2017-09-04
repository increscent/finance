import ApiService from './ApiService.js';
import ListenerService from './ListenerService.js';
import Store from '../Store.js';

class BudgetService extends ListenerService {
  constructor() {
    super();

    this.notifyListeners = this.notifyListeners.bind(this);
    Store.registerListener(() => this.notifyListeners());

    this.fetchBudgets();
  }

  getBudgets() {
    return Store.budgets;
  }

  fetchBudgets() {
    ApiService.getRequest('/api/budgets')
    .then(data => {
      Store.setStore('budgets', data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  addBudget(budget, callback) {
    ApiService.putRequest('/api/budgets/' + budget.name, budget)
    .then(data => {
      insertBudget(data, Store.budgets);
      Store.setStore('budgets', Store.budgets, true);
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
