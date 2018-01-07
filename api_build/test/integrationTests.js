'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _accountService = require('../serviceLayer/accountService');

var _models = require('../dataLayer/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('accountService', function () {
  describe('#findOrCreate(googleId, firstName, lastName)', function () {
    it('should create a new account if the account does not exist, or return the existing account', function () {
      (0, _accountService.findOrCreate)('test_google_id', 'Henry', 'Roth').then(function (accountId) {
        _assert2.default.notEqual(accountId, undefined);

        return (0, _accountService.findOrCreate)('test_google_id', 'Lucy', 'Whitmore').then(function (newAccountId) {
          _assert2.default.equal(accountId, newAccountId);

          _models.Account.find({ first_name: 'Lucy' }).then(function (accounts) {
            return _assert2.default.equal(accounts.length, 0);
          });
        });
      }).catch(function (error) {
        return _assert2.default.fail(error);
      });
    });
  });
});