import ApiService from './ApiService.js';
import ListenerService from './ListenerService.js';
import Store from '../Store.js';

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
