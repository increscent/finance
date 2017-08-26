import ApiService from './api_service.js';
import ListenerService from './listener_service.js';
import AnalysisService from './analysis_service.js';
import BudgetService from './budget_service.js';

class TransactionService extends ListenerService {
  constructor() {
    super();
    this.credits = [];
    this.debits = [];
    this.readableDebits = [];
    this.creditCategories = [];
    this.fetchCredits();
    this.fetchDebits();

    this.onBudgetEvent = this.onBudgetEvent.bind(this);
    BudgetService.registerListener(this.onBudgetEvent)
  }

  onBudgetEvent() {
    this.readableDebits = calcReadableDebits(this.debits);
    this.notifyListeners();
  }

  fetchCredits() {
    ApiService.getRequest('/api/transaction/credits')
    .then(data => {
      this.credits = data;
      this.creditCategories = calcCreditCategories(this.credits);
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }

  fetchDebits() {
    ApiService.getRequest('/api/transaction/debits')
    .then(data => {
      this.debits = data;
      this.readableDebits = calcReadableDebits(this.debits);
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }

  addTransaction(transaction, callback) {
    ApiService.putRequest('/api/transaction/' + transaction.type, transaction)
    .then(data => {
      insertTransaction(data, (transaction.type == 'debit')? this.debits:this.credits);
      if (transaction.type == 'debit') this.readableDebits = calcReadableDebits(this.debits); // this is ugly !!!
      this.notifyListeners();
      AnalysisService.fetchOverview();
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
      removeTransaction(transaction._id, (transaction.type == 'debit')? this.debits:this.credits);
      if (transaction.type == 'debit') this.readableDebits = calcReadableDebits(this.debits); // this is ugly !!!
      this.notifyListeners();
      AnalysisService.fetchOverview();
    })
    .catch(error => {
      console.log(error);
    });
  }
}

export default (new TransactionService());

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
  BudgetService.budgets.forEach(x => {
    budgets[x._id] = x.category;
  });
  return budgets;
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
