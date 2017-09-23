import ApiService from './ApiService.js';
import ListenerService from './ListenerService.js';
import Store from '../Store.js';
import AccountService from './AccountService.js';
import Helpers from '../Helpers.js';

class BudgetService extends ListenerService {
  constructor() {
    super();

    this.notifyListeners = this.notifyListeners.bind(this);
    Store.registerListener(() => this.notifyListeners());

    if (AccountService.isLoggedIn) this.fetchBudgets();
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

  addOrUpdateBudget(budget) {
    return ApiService.putRequest('/api/budgets/' + Helpers.encodeURIParam(budget.uri), budget)
    .then(data => {
      removeBudget(budget.uri, Store.budgets);
      insertBudget(data, Store.budgets);
      Store.setStore('budgets', Store.budgets, true);
    });
  }

  deleteBudget(budgetName) {
    return ApiService.deleteRequest('/api/budgets/' + Helpers.encodeURIParam(budgetName))
    .then(data => {
      removeBudget(budgetName, Store.budgets);
      Store.setStore('budgets', Store.budgets, true);
      console.log('deleted ' + budgetName);
    });
  }
}

export default new BudgetService();

function insertBudget(budget, collection) {
  for (var i = 0; i < collection.length - 1; i++) { // 'Other' is at the end
    if (collection[i].name < budget.name) {
      collection.splice(i + 1, 0, budget); // sort by name
      return;
    }
  }
  collection.splice(0, 0, budget); // insert at beginning
}

function removeBudget(budgetName, collection) {
  var index = collection.findIndex((x) => x.name == budgetName);
  if (index >= 0) collection.splice(index, 1);
}
