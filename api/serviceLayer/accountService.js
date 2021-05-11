import { Account, Period } from '../dataLayer/models';
import { startOfThisMonth } from './dateHelper';
import { convertAccount } from '../dataLayer/converters';

export function getAccount(accountId) {
  return findById(accountId).then(convertAccount);
}

function findById(accountId) {
  return Account.findOne({_id: accountId})
  .then(account => {
    if (account) {
      return account;
    } else {
      throw {statusCode: 400, message: 'Account not found'};
    }
  });
}

function createAccount(googleId, firstName, lastName) {
  let newAccountPromise = (new Account({
    first_name: firstName,
    last_name: lastName,
    google_id: googleId
  })).save();

  let newPeriodPromise = (new Period({
    start_date: startOfThisMonth()
  })).save();

  return Promise.all([newAccountPromise, newPeriodPromise])
  .then(([newAccount, newPeriod]) => {
    newAccount.current_period_id = newPeriod._id;
    newPeriod.account_id = newAccount._id;

    return Promise.all([newAccount.save(), newPeriod.save()]);
  })
  .then(([newAccount, newPeriod]) => {
    return newAccount._id;
  });
}
