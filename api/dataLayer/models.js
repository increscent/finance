import mongoose, { Types, Schema } from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/finance2', {useNewUrlParser: true});
let ObjectId = Schema.Types.ObjectId;

let accountSchema = {
    first_name: String,
    last_name: String,
    google_id: String,
    current_period_id: ObjectId,
    username: String,
    password: String,
    salt: String
};

let periodSchema = {
    account_id: ObjectId,
    previous_period_id: ObjectId,
    start_date: Date,
    end_date: Date
};

let categorySchema = {
    account_id: ObjectId,
    period_id: ObjectId,
    name: String,
    allowance: Number,
    allowance_type: String,
    current_limit: Number
};

let transactionSchema = {
    account_id: ObjectId,
    period_id: ObjectId,
    category_id: ObjectId,
    type: String,
    note: String,
    amount: Number,
    date: Date
};

export const Account = mongoose.model('Account', new Schema(accountSchema));
export const Period = mongoose.model('Period', new Schema(periodSchema));
export const Category = mongoose.model('Category', new Schema(categorySchema));
export const Transaction = mongoose.model('Transaction', new Schema(transactionSchema));
