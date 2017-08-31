import ApiService from './ApiService.js';
import ListenerService from './ListenerService.js';
import Store from '../Store.js';

class TransactionService extends ListenerService {
  constructor() {
    super();
    this.transactions = [];
    this.fetchTransactions();

    this.update = this.update.bind(this);
    Store.registerListener(this.update);
  }

  update() {
    this.transactions = Store.transactions;
    this.notifyListeners();
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
      insertTransaction(data, this.transactions);
      Store.setStore('transactions', this.transactions, true);
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
      removeTransaction(transaction._id, this.transactions);
      Store.setStore('transactions', this.transactions, true);
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
