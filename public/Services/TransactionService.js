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

  getDebitTransactionsForBudget(budget) {
    return Store.transactions.filter(transaction => {
      return transaction.from == budget.name && transaction.to == '@Debit';
    })
    .sort((transactionA,transactionB) => {
      return (new Date(transactionA.date)) < (new Date(transactionB.date))? 1:-1;
    });
  }

  getCreditTransactions() {
    return Store.transactions.filter(transaction => {
      return transaction.from == '@Credit';
    })
    .sort((transactionA,transactionB) => {
      return (new Date(transactionA.date)) < (new Date(transactionB.date))? 1:-1;
    });
  }

  fetchTransactions() {
    ApiService.getRequest('/api/transaction')
    .then(data => {
      Store.setStore('transactions', data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  addTransaction(transaction) {
    return ApiService.postRequest('/api/transaction', transaction)
    .then(data => {
      insertTransaction(data, Store.transactions);
      Store.setStore('transactions', Store.transactions, true);
    });
  }

  updateTransaction(transaction) {
    return ApiService.putRequest('/api/transaction/' + transaction._id, transaction)
    .then(data => {
      removeTransaction(transaction._id, Store.transactions);
      insertTransaction(data, Store.transactions);
      Store.setStore('transactions', Store.transactions, true);
    })
  }

  deleteTransaction(transaction_id) {
    return ApiService.deleteRequest('/api/transaction/' + transaction_id)
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
