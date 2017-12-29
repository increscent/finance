'use strict';

var assert = require('assert');
var Transaction = require('../classes/Transaction');
var Budget = require('../classes/Budget');

describe('Transaction', function () {
  describe('#hasValidEndpoints()', function () {
    it('should return true/false whether the transaction endpoints are valid budget categories', function () {
      var budgets = [{ name: 'Saving' }, { name: 'Food' }, { name: 'Toys' }];

      var transaction = new Transaction(null, [], { to: 'Other', from: '@Debit' });
      assert.equal(true, transaction.hasValidEndpoints());

      var transaction = new Transaction(null, [], { to: 'nothing', from: '@Debit' });
      assert.equal(false, transaction.hasValidEndpoints());

      var transaction = new Transaction(null, [], { to: '@Credit', from: 'nothing' });
      assert.equal(false, transaction.hasValidEndpoints());

      var transaction = new Transaction(null, budgets, { to: 'Toys', from: 'Other' });
      assert.equal(true, transaction.hasValidEndpoints());
    });
  });
});

describe('Budget', function () {
  describe('#isValidName(budget_name)', function () {
    it('should return true/false whether the budget name is available', function () {
      var budgets = [{ name: 'Saving' }, { name: 'Food' }, { name: 'Toys' }];

      var budget = new Budget(null, budgets, null, null);
      assert.equal(true, budget.isValidName('Fun!'));
      assert.equal(false, budget.isValidName('toys'));
      assert.equal(false, budget.isValidName('@crediT'));
      assert.equal(false, budget.isValidName(' oThEr '));
    });
  });
});