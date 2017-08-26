var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/finance', {useMongoClient: true});
var Schema = mongoose.Schema;

var Models = {};

var accountSchema = {
  first_name: String,
  last_name: String
};

var transactionSchema = {
  category: String,
  motive: String,
  amount: Number,
  date: Date,
  account_id: String
};

var budgetSchema = {
  category: String,
  allowance: Number,
  allowance_type: String,
  date: Date,
  account_id: String
};

Models.Account = mongoose.model('Account', new Schema(accountSchema));
Models.Debit = mongoose.model('Debit', new Schema(transactionSchema));
Models.Credit = mongoose.model('Credit', new Schema(transactionSchema));
Models.Budget = mongoose.model('Budget', new Schema(budgetSchema));

module.exports = Models;
