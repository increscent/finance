'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = exports.Category = exports.Period = exports.Account = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/finance', { useMongoClient: true });
var ObjectId = _mongoose.Schema.Types.ObjectId;

var accountSchema = {
  first_name: String,
  last_name: String,
  google_id: String,
  current_period_id: ObjectId
};

var periodSchema = {
  account_id: ObjectId,
  previous_period_id: ObjectId,
  start_date: Date,
  end_date: Date
};

var categorySchema = {
  account_id: ObjectId,
  period_id: ObjectId,
  name: String,
  allowance: Number,
  allowance_type: String,
  current_limit: Number
};

var transactionSchema = {
  account_id: ObjectId,
  period_id: ObjectId,
  category_id: ObjectId,
  type: String,
  note: String,
  amount: Number,
  date: Date
};

var Account = exports.Account = _mongoose2.default.model('Account', new _mongoose.Schema(accountSchema));
var Period = exports.Period = _mongoose2.default.model('Period', new _mongoose.Schema(periodSchema));
var Category = exports.Category = _mongoose2.default.model('Category', new _mongoose.Schema(categorySchema));
var Transaction = exports.Transaction = _mongoose2.default.model('Transaction', new _mongoose.Schema(transactionSchema));