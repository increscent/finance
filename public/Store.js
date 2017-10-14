import ListenerService from "./Services/ListenerService.js";
import AccountService from "./Services/AccountService.js";
import AnalysisService from "./Services/AnalysisService.js";
import BudgetService from "./Services/BudgetService.js";
import TransactionService from "./Services/TransactionService.js";

class Store extends ListenerService {
  constructor() {
    super();
    this.accountService = new AccountService();
    this.analysisService = new AnalysisService();
    this.budgetService = new BudgetService();
    this.transactionService = new TransactionService();

    this.budgets = [];
    this.transactions = [];
    this.overview = [];

    this.hasUpdated("all");
  }

  hasUpdated(type) {
    let periodId = this.accountService.periodId;
    this.fetchOverview(periodId);
    if (type !== "budgets") this.fetchBudgets(periodId);
    if (type !== "transactions") this.fetchTransactions(periodId);
  }

  isLoggedIn() {
    return this.accountService.isLoggedIn;
  }

  fetchOverview() {
    this.analysisService.fetchOverview(this.accountService.periodId)
    .then(data => {
      this.overview = data;
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }

  fetchBudgets() {
    this.budgetService.fetchBudgets(this.accountService.periodId)
    .then(data => {
      this.budgets = data;
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }

  addOrUpdateBudget(budget) {
    return this.budgetService.addOrUpdateBudget(budget, this.budgets)
    .then(() => {
      this.hasUpdated("budgets");
    });
  }

  deleteBudget(budgetUri) {
    return this.budgetService.deleteBudget(budgetUri, this.budgets)
    .then(() => {
      this.hasUpdated("budgets");
    });
  }

  fetchTransactions() {
    this.transactionService.fetchTransactions(this.accountService.periodId)
    .then(data => {
      this.transactions = data;
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }

  addTransaction(transaction) {
    return this.transactionService.addTransaction(transaction, this.transactions)
    .then(() => {
      this.hasUpdated("transactions");
    });
  }

  updateTransaction(transaction) {
    return this.transactionService.updateTransaction(transaction, this.transactions)
    .then(() => {
      this.hasUpdated("transactions");
    });
  }

  deleteTransaction(transactionId) {
    return this.transactionService.deleteTransaction(transactionId, this.transactions)
    .then(() => {
      this.hasUpdated("transactions");
    });
  }

  getCreditTransactions() {
    return this.transactionService.getCreditTransactions(this.transactions);
  }

  getDebitTransactionsForBudget(budget) {
    return this.transactionService.getDebitTransactionsForBudget(budget, this.transactions);
  }
}

export default new Store();
