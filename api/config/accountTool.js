const mongoose = require('mongoose');
const crypto = require('crypto');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/finance2', {useNewUrlParser: true});

let ObjectId = mongoose.Schema.Types.ObjectId;
let accountSchema = {
    first_name: String,
    last_name: String,
    google_id: String,
    current_period_id: ObjectId,
    username: String,
    password: String,
    salt: String
};

const Account = mongoose.model('Account', new mongoose.Schema(accountSchema));

module.exports = {
	updateUserPassword: (username, currentPassword, newPassword, newSalt) => {
        Account.findOne({username: username.trim().toLowerCase()})
        .then((account) => {
            if (account && account.password === hashPassword(currentPassword, account.salt)) {
				account.salt = newSalt;
				account.password = hashPassword(newPassword, newSalt);
				account.save({modified: true});
				console.log('success');
            } else {
				console.log('account not found or incorrect password');
            }
        })
        .catch((err) => {
			console.log('failure', err);
        });
	},
};

function hashPassword(password, salt) {
    return crypto.createHmac('sha256', salt)
        .update(password)
        .digest('base64');
}
