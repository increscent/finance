import Helpers from "../Helpers.js";
import ApiService from "./ApiService.js";

export default class BudgetService {
  fetchBudgets(periodId) {
    return ApiService.getRequest("/api/budget", periodId);
  }

  addOrUpdateBudget(budget, collection) {
    return ApiService.putRequest("/api/budget/" + Helpers.encodeURIParam(budget.uri), budget)
    .then(data => {
      this.removeBudget(budget.uri, collection);
      this.insertBudget(data, collection);
    });
  }

  deleteBudget(budgetUri, collection) {
    return ApiService.deleteRequest("/api/budget/" + Helpers.encodeURIParam(budgetUri))
    .then(data => {
      this.removeBudget(budgetUri, collection);
      console.log("deleted " + budgetUri);
    });
  }

  insertBudget(budget, collection) {
    for (var i = 0; i < collection.length - 1; i++) { // "Other" is at the end
      if (collection[i].name < budget.name) {
        collection.splice(i + 1, 0, budget); // sort by name
        return;
      }
    }
    collection.splice(0, 0, budget); // insert at beginning
  }

  removeBudget(budgetName, collection) {
    var index = collection.findIndex((x) => x.name == budgetName);
    if (index >= 0) collection.splice(index, 1);
  }
}
