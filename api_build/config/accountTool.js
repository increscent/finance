'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/finance2', { useNewUrlParser: true });

var ObjectId = mongoose.Schema.Types.ObjectId;
var accountSchema = {
    first_name: String,
    last_name: String,
    google_id: String,
    current_period_id: ObjectId,
    username: String,
    password: String,
    salt: String
};

var Account = mongoose.model('Account', new mongoose.Schema(accountSchema));

module.exports = {
    updateUserPassword: function updateUserPassword(username, currentPassword, newPassword, newSalt) {
        Account.findOne({ username: username.trim().toLowerCase() }).then(function (account) {
            if (account && account.password === hashPassword(currentPassword, account.salt)) {
                account.salt = newSalt;
                account.password = hashPassword(newPassword, newSalt);
                account.save({ modified: true });
                console.log('success');
            } else {
                console.log('account not found or incorrect password');
            }
        }).catch(function (err) {
            console.log('failure', err);
        });
    }
};

function hashPassword(password, salt) {
    return crypto.createHmac('sha256', salt).update(password).digest('base64');
}