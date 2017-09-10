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

  prettifyBudgetName(name) {
    var budget = Store.budgets.find(x => x.name == name) || {};
    if (budget.allowance_type) {
       return name + ' (' + (budget.allowance_type == '$'?'$':'') + budget.allowance + (budget.allowance_type == '%'?'%':'') + ')';
    } else {
      return name;
    }
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
    return ApiService.putRequest('/api/budgets/' + budget.uri, budget)
    .then(data => {
      removeBudget(budget.uri, Store.budgets);
      insertBudget(data, Store.budgets);
      Store.setStore('budgets', Store.budgets, true);
    });
  }

  deleteBudget(budgetName) {
    return ApiService.deleteRequest('/api/budgets/' + budgetName)
    .then(data => {
      removeBudget(budgetName, Store.budgets);
      Store.setStore('budgets', Store.budgets, true);
      console.log('deleted ' + budgetName);
    });
  }
}

export default new BudgetService();

function insertBudget(budget, collection) {
  collection.push(budget);
}

function removeBudget(budgetName, collection) {
  var index = collection.findIndex((x) => x.name == budgetName);
  if (index >= 0) collection.splice(index, 1);
}
