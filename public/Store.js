import ListenerService from "./Services/ListenerService.js";

class Store extends ListenerService {
  constructor() {
    super();
    this.budgets = [];
    this.credits = [];
    this.debits = [];
  }

  setStore(store, value, server_modified) {
    this[store] = value;
    this.notifyListeners(server_modified);
  }
}

export default new Store();
