import assert from 'assert';
import { findOrCreate } from '../serviceLayer/accountService';
import { Account } from '../dataLayer/models';

describe('accountService', function() {
  describe('#findOrCreate(googleId, firstName, lastName)', function() {
    it('should create a new account if the account does not exist, or return the existing account', function() {
      findOrCreate('test_google_id', 'Henry', 'Roth')
      .then(accountId => {
        assert.notEqual(accountId, undefined);

        return findOrCreate('test_google_id', 'Lucy', 'Whitmore')
        .then(newAccountId => {
          assert.equal(accountId, newAccountId);

          Account.find({first_name: 'Lucy'})
          .then(accounts => assert.equal(accounts.length, 0));
        });
      })
      .catch(error => assert.fail(error));
    });
  });
});
