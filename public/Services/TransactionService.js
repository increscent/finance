import ApiService from './ApiService.js';
import ListenerService from './ListenerService.js';
import Store from '../Store.js';
import AccountService from './AccountService.js';

class TransactionService extends ListenerService {
  constructor() {
    super();
    this.transactions = [];

    this.notifyListeners = this.notifyListeners.bind(this);
    Store.registerListener(() => this.notifyListeners());

    if (AccountService.isLoggedIn) this.fetchTransactions();
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

  addTransaction(transaction) {
    return ApiService.postRequest('/api/transactions', transaction)
    .then(data => {
      insertTransaction(data, Store.transactions);
      Store.setStore('transactions', Store.transactions, true);
    });
  }

  updateTransaction(transaction) {
    return ApiService.putRequest('/api/transactions/' + transaction._id, transaction)
    .then(data => {
      removeTransaction(transaction._id, Store.transactions);
      insertTransaction(data, Store.transactions);
      Store.setStore('transactions', Store.transactions, true);
    })
  }

  deleteTransaction(transaction_id) {
    return ApiService.deleteRequest('/api/transactions/' + transaction_id)
    .then(data => {
      removeTransaction(transaction_id, Store.transactions);
      Store.setStore('transactions', Store.transactions, true);
      console.log('deleted ' + transaction_id);
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
