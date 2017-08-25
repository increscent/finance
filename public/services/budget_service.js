import ApiService from './api_service.js';
import ListenerService from './listener_service.js';

class BudgetService extends ListenerService {
  constructor() {
    super();
    this.budgets = [];
    this.update();
  }

  update() {
    ApiService.getRequest('/api/budget')
    .then(data => {
      this.debitCategories = data;
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }

  addNew(budget, callback) {
    ApiService.putRequest('/api/budget', budget)
    .then(data => {
      callback(null);
    })
    .catch(error => {
      callback(error.toString());
    });
  }
}

export default (new BudgetService());
