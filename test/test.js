var assert = require('assert');
var Transaction = require('../classes/Transaction');

describe('Transaction', function() {
  describe('#hasValidEndpoints()', function() {
    it('should return true/false whether the transaction endpoints are valid budget categories', function() {
      var budgets = [
        {name: 'Saving'},
        {name: 'Food'},
        {name: 'Toys'}
      ];

      var transaction = new Transaction(null, [], {to: 'Other', from: '@Debit'});
      assert.equal(true, transaction.hasValidEndpoints());

      var transaction = new Transaction(null, [], {to: 'nothing', from: '@Debit'});
      assert.equal(false, transaction.hasValidEndpoints());

      var transaction = new Transaction(null, [], {to: '@Credit', from: 'nothing'});
      assert.equal(false, transaction.hasValidEndpoints());

      var transaction = new Transaction(null, budgets, {to: 'Toys', from: 'Other'});
      assert.equal(true, transaction.hasValidEndpoints());
    });
  });
});
