var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/finance', {useMongoClient: true});
var Schema = mongoose.Schema;

var Models = {};

var accountSchema = {
  first_name: String,
  last_name: String,
  budget_period_start: Date,
  budget_period_end: Date,
  google_id: String
};

var transactionSchema = {
  from: String,
  to: String,
  motive: String,
  amount: Number,
  date: Date,
  account_id: String
};

var budgetSchema = {
  name: String,
  allowance: Number,
  allowance_type: String,
  date: Date,
  account_id: String
};

Models.Account = mongoose.model('Account', new Schema(accountSchema));
Models.Transaction = mongoose.model('Transaction', new Schema(transactionSchema));
Models.Budget = mongoose.model('Budget', new Schema(budgetSchema));

module.exports = Models;
