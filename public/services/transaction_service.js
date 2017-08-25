import ApiService from './api_service.js';
import ListenerService from './listener_service.js';

class TransactionService extends ListenerService {
  constructor() {
    super();
    this.debitCategories = [];
    this.creditCategories = [];
    this.update();
  }

  update() {
    ApiService.getRequest('/api/transaction/categories')
    .then(data => {
      this.debitCategories = data.debitCategories;
      this.creditCategories = data.creditCategories;
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }

  addNew(transaction, callback) {
    ApiService.putRequest('/api/transaction/' + transaction.transaction_type, transaction)
    .then(data => {
      callback(null);
    })
    .catch(error => {
      callback(error.toString());
    });
  }
}

export default (new TransactionService());
