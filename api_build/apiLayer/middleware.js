'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAccount = verifyAccount;
exports.handleErrors = handleErrors;
exports.verifyRequestBody = verifyRequestBody;
function verifyAccount(req, res, next) {
  if (!req.user) {
    res.statusCode = 401;
    res.send(JSON.stringify({
      error: 'Unauthorized. Try logging in.'
    }));
  } else {
    req.accountId = req.user;
    next();
  }
}

function handleErrors(req, res, next) {
  var message = res.errorMessage || 'There was a server error, sorry';
  if (res.statusCode != 200 && !res.headerSent) res.send(JSON.stringify({ error: message }));else next();
}

function verifyRequestBody(requiredProperties) {
  return function (req, res, next) {
    try {
      if (req.body === undefined) throw '';
      if (req.body.date === undefined) req.body.date = new Date();
      for (var i = 0; i < requiredProperties.length; i++) {
        if (req.body[requiredProperties[i]] === undefined) throw '';
      }
      next();
    } catch (exception) {
      res.statusCode = 400;
      res.send(JSON.stringify({
        error: 'Invalid request body'
      }));
    }
  };
}