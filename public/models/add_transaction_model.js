export default class AddTransactionModel {
  constructor() {
    this.debitCategories = [];
    this.creditCategories = [];
    this.FETCH_endpoint = '/api/transaction/categories';
  }

  update(categories) {
    this.debitCategories = categories.debitCategories;
    // this.creditCategories = categories.creditCategories;
    this.creditCategories = [];
  }
}
