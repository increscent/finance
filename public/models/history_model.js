export default class HistoryModel {
  constructor() {
    this.transactions = [];
    this.FETCH_endpoint = '/api/analysis/history';
  }

  update(transactions) {
    this.transactions = transactions;
  }
}
