'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Models = require('../models');
var DateHelper = require('./DateHelper');

var Helpers = function () {
  function Helpers() {
    _classCallCheck(this, Helpers);

    this.getTransactions = this.getTransactions.bind(this);
    this.getBudgets = this.getBudgets.bind(this);
  }

  _createClass(Helpers, [{
    key: 'verifyAccount',
    value: function verifyAccount(req, res, next) {
      if (!req.user) return res.redirect('/');
      req.account = req.user;
      return next();
    }
  }, {
    key: 'getBudgets',
    value: function getBudgets(req, res, next) {
      var period = this.getPeriod(req);

      Models.Budget.find({
        account_id: req.account._id,
        date: {
          $gt: period.start_date,
          $lt: period.end_date
        }
      }, function (err, budgets) {
        req.budgets = budgets || [];
        return next();
      });
    }
  }, {
    key: 'getTransactions',
    value: function getTransactions(req, res, next) {
      var period = this.getPeriod(req);

      Models.Transaction.find({
        account_id: req.account._id,
        date: {
          $gt: period.start_date,
          $lt: period.end_date
        }
      }, function (err, transactions) {
        req.transactions = transactions || [];
        return next();
      });
    }
  }, {
    key: 'getPeriod',
    value: function getPeriod(req) {
      var periodId = req.query.periodId;
      var period = undefined;
      if (periodId) period = req.account.past_budget_periods.find(function (period) {
        return period._id == periodId;
      });

      if (!periodId || !period) {
        return {
          start_date: req.account.budget_period_start,
          end_date: DateHelper.rightNow()
        };
      } else {
        return period;
      }
    }
  }, {
    key: 'cleanBudget',
    value: function cleanBudget(budget) {
      return {
        name: budget.name,
        allowance: budget.allowance,
        allowance_type: budget.allowance_type,
        date: budget.date
      };
    }
  }, {
    key: 'cleanTransaction',
    value: function cleanTransaction(transaction) {
      return {
        _id: transaction._id,
        from: transaction.from,
        to: transaction.to,
        motive: transaction.motive,
        amount: transaction.amount,
        date: transaction.date
      };
    }
  }, {
    key: 'validateRequestBody',
    value: function validateRequestBody(required_fields) {
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
      };
    }
  }, {
    key: 'userError',
    value: function userError(res, text) {
      res.statusCode = 400;
      res.send(text);
    }
  }, {
    key: 'serverError',
    value: function serverError(res, text) {
      res.statusCode = 500;
      res.send(JSON.stringify({
        error: text
      }));
    }
  }, {
    key: 'errorResponse',
    value: function errorResponse(res, text) {
      var statusCode = parseInt(text.substr(0, 3));
      if (!statusCode) {
        res.statusCode = 500;
      } else {
        res.statusCode = statusCode;
        text = text.substr(3);
      }
      res.send(JSON.stringify({
        error: text
      }));
    }
  }]);

  return Helpers;
}();

module.exports = new Helpers();