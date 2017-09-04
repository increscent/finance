import ApiService from './ApiService.js';
import ListenerService from './ListenerService.js';
import Store from '../Store.js';

class TransactionService extends ListenerService {
  constructor() {
    super();
    this.transactions = [];

    this.notifyListeners = this.notifyListeners.bind(this);
    Store.registerListener(() => this.notifyListeners());

    this.fetchTransactions();
  }

  getTransactions() {
    return Store.transactions;
  }

  fetchTransactions() {
    ApiService.getRequest('/api/transactions')
    .then(data => {
      Store.setStore('transactions', data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  addTransaction(transaction, callback) {
    ApiService.postRequest('/api/transactions', transaction)
    .then(data => {
      insertTransaction(data, Store.transactions);
      Store.setStore('transactions', Store.transactions, true);
      callback(null);
    })
    .catch(error => {
      callback(error.toString());
    });
  }

  deleteTransaction(transaction) {
    console.log('deleted ' + transaction._id);
    ApiService.deleteRequest('/api/transactions/' + transaction._id)
    .then(data => {
      removeTransaction(transaction._id, Store.transactions);
      Store.setStore('transactions', Store.transactions, true);
    })
    .catch(error => {
      console.log(error);
    });
  }
}

export default new TransactionService();

function insertTransaction(transaction, collection) {
  collection.push(transaction);
}

function removeTransaction(transaction_id, collection) {
  var index = collection.findIndex((x) => x._id == transaction_id);
  if (index >= 0) collection.splice(index, 1);
}
