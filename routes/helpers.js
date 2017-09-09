var Models = require('../models');

module.exports = {
  verifyAccount: function (req, res, next) {
    var account_id = req.headers['account-id'];
    Models.Account.findOne({_id: account_id}, function (err, account) {
      if (!account) return module.exports.userError(res, 'Account does not exist: ' + req.headers['account-id']);

      req.account = account;
      return next();
    });
  },

  getBudgets: function (req, res, next) {
    Models.Budget.find({account_id: req.account._id}, function (err, budgets) {
      req.budgets = budgets || [];
      return next();
    });
  },

  getTransactions: function (req, res, next) {
    Models.Transaction.find({
      account_id: req.account._id,
      date: {
        $gt: req.account.budget_period_start,
        $lt: req.account.budget_period_end
      }
    }, function (err, transactions) {
      req.transactions = transactions || [];
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
      new_document.account_id = req.account._id;
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
    res.send(JSON.stringify({
      error: text
    }));
  },

  errorResponse: function (res, text) {
    var statusCode = parseInt(text.substr(0, 3));
    if (!statusCode) {
      res.statusCode = 500;
    } else {
      res.statusCode = statusCode;
      text = text.substr(3);
    }
    res.send(JSON.stringify({
      error: text
    }))
  }
};
