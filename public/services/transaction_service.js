import ApiService from './api_service.js';
import ListenerService from './listener_service.js';
import Store from '../store.js';

class TransactionService extends ListenerService {
  constructor() {
    super();
    this.debits = [];
    this.credits = [];
    this.readableDebits = [];
    this.debitCategories = [];
    this.creditCategories = [];
    this.fetchCredits();
    this.fetchDebits();

    this.update = this.update.bind(this);
    Store.registerListener(this.update);
  }

  update() {
    this.debits = Store.debits;
    this.credits = Store.credits;
    this.readableDebits = calcReadableDebits(Store.debits);
    this.debitCategories = calcDebitCategories(Store.budgets);
    this.creditCategories = calcCreditCategories(Store.credits);
    this.notifyListeners();
  }

  fetchCredits() {
    ApiService.getRequest('/api/transaction/credits')
    .then(data => {
      Store.setStore('credits', data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  fetchDebits() {
    ApiService.getRequest('/api/transaction/debits')
    .then(data => {
      Store.setStore('debits', data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  addTransaction(transaction, callback) {
    ApiService.putRequest('/api/transaction/' + transaction.type, transaction)
    .then(data => {
      var collection = (transaction.type == 'debit')? 'debits':'credits';
      insertTransaction(data, this[collection]);
      Store.setStore(collection, this[collection], true);
      callback(null);
    })
    .catch(error => {
      callback(error.toString());
    });
  }

  deleteTransaction(transaction) {
    console.log('deleted ' + transaction._id);
    ApiService.deleteRequest('/api/transaction/' + transaction.type + '/' + transaction._id)
    .then(data => {
      var collection = (transaction.type == 'debit')? 'debits':'credits';
      removeTransaction(transaction._id, this[collection]);
      Store.setStore(collection, this[collection], true);
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

function calcReadableDebits(debits) {
  var budgets = calcBudgets();
  var readableDebits = debits.map(x => {
    return {
      _id: x._id,
      category: budgets[x.category],
      motive: x.motive,
      amount: x.amount,
      date: x.date
    };
  });
  return readableDebits;
}

function calcBudgets() {
  var budgets = {};
  Store.budgets.forEach(x => {
    budgets[x._id] = x.category;
  });
  return budgets;
}

function calcDebitCategories(budgets) {
  return budgets.map(x => {
    return {
      id: x._id,
      category: x.category
    };
  });
}

function calcCreditCategories(credits) {
  var categories = credits.map(x => {
    return {
      id: x.category,
      category: x.category
    }
  });
  return noDuplicates(categories, x => x.id);
}

function noDuplicates(array, getKey) {
  var seen = {};
  return array.filter((x) => {
    var key = getKey(x);
    if (seen[key]) {
      return false;
    } else {
      seen[key] = true;
      return true;
    }
  });
}
