import ApiService from "./ApiService.js";

export default class TransactionService {
  getDebitTransactionsForBudget(budget, collection) {
    return collection.filter(transaction => {
      return transaction.from == budget.name && transaction.to == '@Debit';
    })
    .sort((transactionA,transactionB) => {
      return (new Date(transactionA.date)) < (new Date(transactionB.date))? 1:-1;
    });
  }

  getCreditTransactions(collection) {
    return collection.filter(transaction => {
      return transaction.from == '@Credit';
    })
    .sort((transactionA,transactionB) => {
      return (new Date(transactionA.date)) < (new Date(transactionB.date))? 1:-1;
    });
  }

  fetchTransactions(periodId) {
    return ApiService.getRequest('/api/transaction', periodId);
  }

  addTransaction(transaction, collection) {
    return ApiService.postRequest('/api/transaction', transaction)
    .then(data => {
      this.insertTransaction(data, collection);
    });
  }

  updateTransaction(transaction, collection) {
    return ApiService.putRequest('/api/transaction/' + transaction._id, transaction)
    .then(data => {
      this.removeTransaction(transaction._id, collection);
      this.insertTransaction(data, collection);
    })
  }

  deleteTransaction(transactionId) {
    return ApiService.deleteRequest('/api/transaction/' + transactionId)
    .then(data => {
      this.removeTransaction(transactionId, collection);
      console.log('deleted ' + transactionId);
    });
  }

  insertTransaction(transaction, collection) {
    collection.push(transaction);
  }

  removeTransaction(transactionId, collection) {
    var index = collection.findIndex((x) => x._id == transactionId);
    if (index >= 0) collection.splice(index, 1);
  }
}
