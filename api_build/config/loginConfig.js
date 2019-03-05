'use strict';

var _models = require('../dataLayer/models.js');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
    app.post('/login', function (req, res) {
        _models.Account.findOne({ username: req.body.username.trim().toLowerCase() }).then(function (account) {
            if (account && account.password === hashPassword(req.body.password, account.salt)) {
                req.session.accountId = account._id;
                req.session.loggedIn = true;
                req.session.save(function () {
                    res.cookie('is-logged-in', true);
                    res.send({ success: true });
                });
            } else {
                res.send({ success: false });
            }
        }).catch(function (err) {
            res.send({ success: false });
        });
    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function () {
            res.redirect('/');
        });
    });

    app.use(function (req, res, next) {
        var loginFail = function loginFail() {
            req.user = null;
            res.cookie('is-logged-in', false);
            next();
        };

        if (req.session.accountId && req.session.loggedIn) {
            _models.Account.findOne({ _id: req.session.accountId }).then(function (account) {
                if (account) {
                    req.user = account;
                    res.cookie('is-logged-in', true);
                    next();
                } else {
                    loginFail();
                }
            }).catch(function (err) {
                return loginFail();
            });
        } else {
            loginFail();
        }
    });
};

function hashPassword(password, salt) {
    return _crypto2.default.createHmac('sha256', salt).update(password).digest('base64');
}