var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var secrets = require('./secrets');
var Account = require('../classes/Account');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
      clientID: secrets.GOOGLE_CLIENT_ID,
      clientSecret: secrets.GOOGLE_CLIENT_SECRET,
      callbackURL: secrets.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, callback) {
      var account = new Account();
      account.findOrCreate(profile.id, profile.name.givenName, profile.name.familyName)
      .then(user => {
        return callback(null, user);
      })
      .catch(error => {
        return callback(error);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.google_id);
  });

  passport.deserializeUser(function(id, done) {
    (new Account()).find(id)
    .then(user => {
      return done(null, user);
    })
    .catch(error => {
      return done(error);
    });
  });

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/logout', function(req, res){
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
}
