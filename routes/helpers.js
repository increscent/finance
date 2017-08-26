var Models = require('../models');

module.exports = {
  verifyAccount: function (req, res, next) {
    var account_id = req.headers['account-id'];
    Models.Account.findOne({_id: account_id}, function (err, account) {
      if (!account) return module.exports.userError(res, 'Account does not exist: ' + req.headers['account-id']);

      req.account_id = account_id;
      return next();
    });
  },

  getBudgets: function (req, res, next) {
    Models.Budget.find({account_id: req.account_id}, function (err, budgets) {
      req.budgets = budgets || [];
      return next();
    });
  },

  getDebits: function (req, res, next) {
    Models.Debit.find({account_id: req.account_id}, function (err, debits) {
      req.debits = debits || [];
      return next();
    });
  },

  getCredits: function (req, res, next) {
    Models.Credit.find({account_id: req.account_id}, function (err, credits) {
      req.credits = credits || [];
      return next();
    });
  },

  validateRequestBody: function (required_fields) {
    return function (req, res, next) {
      if (required_fields.includes('date') && !req.body.date) req.body.date = Date.now();

      var new_document = {};
      for (var i in required_fields) {
        var field = required_fields[i];
        if (req.body[field] == undefined) {
          return module.exports.userError(res, 'Missing one or more required fields: ' + required_fields.toString());
        } else {
          new_document[field] = req.body[field];
        }
      }
      new_document.account_id = req.account_id;
      req.validated_body = new_document;

      next();
    }
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
