var Models = require('../models');

class Helpers {
  verifyAccount(req, res, next) {
    if (!req.user) return res.redirect('/');
    req.account = req.user;
    return next();
  }

  getBudgets(req, res, next) {
    Models.Budget.find({account_id: req.account._id}, function (err, budgets) {
      req.budgets = budgets || [];
      return next();
    });
  }

  getTransactions(req, res, next) {
    Models.Transaction.find({
      account_id: req.account._id,
      date: {
        $gt: req.account.budget_period_start
      }
    }, function (err, transactions) {
      req.transactions = transactions || [];
      return next();
    });
  }

  cleanBudget(budget) {
    return {
      name: budget.name,
      allowance: budget.allowance,
      allowance_type: budget.allowance_type,
      date: budget.date
    };
  }

  cleanTransaction(transaction) {
    return {
      _id: transaction._id,
      from: transaction.from,
      to: transaction.to,
      motive: transaction.motive,
      amount: transaction.amount,
      date: transaction.date
    };
  }

  validateRequestBody(required_fields) {
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
  }

  userError(res, text) {
    res.statusCode = 400;
    res.send(text);
  }

  serverError(res, text) {
    res.statusCode = 500;
    res.send(JSON.stringify({
      error: text
    }));
  }

  errorResponse(res, text) {
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
}

module.exports = new Helpers();
