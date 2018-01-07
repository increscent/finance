import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import { getSecrets } from './secrets';
import { findOrCreate } from '../serviceLayer/accountService';

const googleStrategy  = passportGoogle.Strategy;

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new googleStrategy({
      clientID: getSecrets().GOOGLE_CLIENT_ID,
      clientSecret: getSecrets().GOOGLE_CLIENT_SECRET,
      callbackURL: getSecrets().GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, callback) {
      findOrCreate(profile.id, profile.name.givenName, profile.name.familyName)
      .then(accountId => {
        return callback(null, accountId);
      })
      .catch(error => {
        return callback(error);
      });
    }
  ));

  passport.serializeUser(function(accountId, done) {
    done(null, accountId);
  });

  passport.deserializeUser(function(accountId, done) {
    done(null, accountId);
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
