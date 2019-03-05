import { Account } from '../dataLayer/models.js';
import crypto from 'crypto';

module.exports = function (app) {
    app.post('/login', function(req, res) {
        Account.findOne({username: req.body.username.trim().toLowerCase()})
        .then((account) => {
            if (account && account.password === hashPassword(req.body.password, account.salt)) {
                req.session.accountId = account._id;
                req.session.loggedIn = true;
                req.session.save(() => {
                    res.cookie('is-logged-in', true);
                    res.send({success: true});
                });
            } else {
                res.send({success: false});
            }
        })
        .catch((err) => {
            res.send({success: false});
        });
    });

    app.get('/logout', function(req, res){
        req.session.destroy(() => {
            res.redirect('/');
        });
    });

    app.use(function (req, res, next) {
        let loginFail = () => {
            req.user = null;
            res.cookie('is-logged-in', false);
            next();
        };

        if (req.session.accountId && req.session.loggedIn) {
            Account.findOne({_id: req.session.accountId})
            .then(account => {
                if (account) {
                    req.user = account;
                    res.cookie('is-logged-in', true);
                    next();
                } else {
                    loginFail();
                }
            })
            .catch(err => loginFail());
        } else {
            loginFail();
        }
    });
}

function hashPassword(password, salt) {
    return crypto.createHmac('sha256', salt)
        .update(password)
        .digest('base64');
}
