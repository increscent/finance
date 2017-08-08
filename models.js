var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/finance', {useMongoClient: true});
var Schema = mongoose.Schema;

var Models = {};
Models.Budget = mongoose.model('Budget', new Schema({
  category: String,
  allowance: Number,
  allowance_type: {type: String, default: '$'}
}));

var transactionSchema = new Schema({
  category: String,
  motive: String,
  amount: Number,
  date: {type: Date, default: Date.now}
});

Models.Credit = mongoose.model('Credit', transactionSchema);
Models.Debit = mongoose.model('Debit', transactionSchema);

module.exports = Models;
