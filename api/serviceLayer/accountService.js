import { Account, Period } from '../dataLayer/models';
import { startOfThisMonth } from './dateHelper';
import { convertAccount } from '../dataLayer/converters';

export function findOrCreate(googleId, firstName, lastName) {
  return findByGoogleId(googleId)
  .catch(error => {
    return createAccount(googleId, firstName, lastName);
  });
}

export function getAccount(accountId) {
  return findById(accountId).then(convertAccount);
}

function findById(accountId) {
  return Account.findOne({_id: accountId})
  .then(account => {
    if (account) {
      return account;
    } else {
      throw 'Account not found';
    }
  })
  .catch(error => {
    console.log(error);
    throw error;
  });
}

function findByGoogleId(googleId) {
  return Account.findOne({google_id: googleId})
  .then(account => {
    if (account) {
      return account._id;
    } else {
      throw 'Account not found';
    }
  });
}

function createAccount(googleId, firstName, lastName) {
  return (new Account({
    first_name: firstName,
    last_name: lastName,
    google_id: googleId
  })).save()
  .then(account => {

    return (new Period({
      start_date: startOfThisMonth()
    })).save()
    .then(period => {
      account.current_period_id = period._id;
      return account.save();
    });

  });
}
