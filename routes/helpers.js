var Models = require('../models');

module.exports = {
  getAccountData: function (req, res, next) {
    Models.Account.findOne({_id: req.headers['account-id']}, function (err, account) {
      if (!account) return module.exports.userError(res, 'Account does not exist: ' + req.headers['account-id']);

      req.account = account;
      return next();
    });
  },

  validateRequestBody: function (required_fields) {
    return function (req, res, next) {
      if (required_fields.includes('date') && !req.body.date) req.body.date = Date.now();

      for (var i in required_fields) {
        if (req.body[required_fields[i]] == undefined) {
          return module.exports.userError(res, 'Missing one or more required fields: ' + required_fields.toString());
        }
      }
      next();
    };
  },

  generateNewDocument(fields, request_body) {
    var new_document = {};
    for (var i in fields) {
      new_document[fields[i]] = request_body[fields[i]];
    }
    return new_document;
  },

  userError: function (res, text) {
    res.statusCode = 400;
    res.send(text);
  },

  serverError: function (res, text) {
    res.statusCode = 500;
    res.send(text);
  }
};
