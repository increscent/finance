var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var secrets = require('./secrets');
var Account = require('../classes/Account');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
      clientID: secrets.google_client_id,
      clientSecret: secrets.google_client_secret,
      callbackURL: "http://localhost:45678/auth/google/callback"
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
    passport.authenticate('google', { failureRedirect: '/test' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/test');
    }
  );

  app.get('/test', function (req, res) {
    console.log(req.user);
    res.send('yay!');
  });
}
