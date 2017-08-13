var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/finance', {useMongoClient: true});
var Schema = mongoose.Schema;

var Models = {};

var transactionSchema = {
  category: String,
  motive: String,
  amount: Number,
  date: Date
};

Models.Account = mongoose.model('Account', new Schema({
  budgets: [{
    category: String,
    allowance: Number,
    allowance_type: String,
    date: Date
  }],
  credits: [transactionSchema],
  debits: [transactionSchema]
}));

module.exports = Models;
