'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGoogleOauth = require('passport-google-oauth20');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

var _secrets = require('./secrets');

var _accountService = require('../serviceLayer/accountService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var googleStrategy = _passportGoogleOauth2.default.Strategy;

module.exports = function (app) {
  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());

  _passport2.default.use(new googleStrategy({
    clientID: (0, _secrets.getSecrets)().GOOGLE_CLIENT_ID,
    clientSecret: (0, _secrets.getSecrets)().GOOGLE_CLIENT_SECRET,
    callbackURL: (0, _secrets.getSecrets)().GOOGLE_CALLBACK_URL
  }, function (accessToken, refreshToken, profile, callback) {
    (0, _accountService.findOrCreate)(profile.id, profile.name.givenName, profile.name.familyName).then(function (accountId) {
      return callback(null, accountId);
    }).catch(function (error) {
      return callback(error);
    });
  }));

  _passport2.default.serializeUser(function (accountId, done) {
    done(null, accountId);
  });

  _passport2.default.deserializeUser(function (accountId, done) {
    done(null, accountId);
  });

  app.get('/auth/google', _passport2.default.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback', _passport2.default.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/');
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.use('/', function (req, res, next) {
    if (req.user) {
      res.cookie('is-logged-in', true);
    } else {
      res.cookie('is-logged-in', false);
    }
    next();
  });
};