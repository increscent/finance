import { Period, Account, Category, Transaction } from '../dataLayer/models';
import { convertPeriod } from '../dataLayer/converters';
import { rightNow } from './dateHelper';

export function getPeriods(accountId) {
  return Period.find({account_id: accountId})
  .then(periods => periods.map(convertPeriod));
}

export function createPeriod(accountId) {
  return Account.findOne({_id: accountId})
  .then(account => {
    if (!account) throw {statusCode: 400, message: 'Account not found.'};

    return endPeriod(accountId, account.current_period_id)
    .then(() => account);

  })
  .then(account => {

    return (new Period({
      start_date: rightNow(),
      account_id: accountId,
      previous_period_id: account.current_period_id
    })).save()
    .then(newPeriod => [account, newPeriod]);

  })
  .then(([account, newPeriod]) => {

    return updateAccountPeriod(account, newPeriod._id)
    .then(account => newPeriod);

  })
  .then(newPeriod => {

    return pullInUnusedCredits(accountId, newPeriod._id)
    .then(totalCredits => [newPeriod, totalCredits]);

  })
  .then(([newPeriod, totalCredits]) => {

    return initializeCategories(accountId, newPeriod, newPeriod.previous_period_id, totalCredits)
    .then(() => newPeriod);

  })
  .then(convertPeriod);
}

export function deleteCurrentPeriod(accountId) {
  return Account.findOne({_id: accountId})
  .then(account => {
    if (!account) throw {statusCode: 400, message: 'Account not found.'};

    // find current period
    return Period.findOne({
      _id: account.current_period_id,
      account_id: accountId
    })
    .then(currentPeriod => {
      if (!currentPeriod) throw {statusCode: 400, message: 'Period not found.'};

      return [account, currentPeriod];
    });

  })
  .then(([account, currentPeriod]) => {

    // set previous period as current period
    if (!currentPeriod.previous_period_id)
      throw {statusCode: 400, message: 'This period cannot be deleted'};

    return updateAccountPeriod(account, currentPeriod.previous_period_id)
    .then(account => currentPeriod);

  })
  .then(currentPeriod => {

    // find previous period
    return Period.findOne({
      _id: currentPeriod.previous_period_id,
      account_id: accountId
    })
    .then(previousPeriod => {
      if (!previousPeriod) throw {statusCode: 400, message: 'Period not found.'};

      return [currentPeriod, previousPeriod];
    });

  })
  .then(([currentPeriod, previousPeriod]) => {

    // remove all current categories
    return Category.find({period_id: currentPeriod._id})
    .then(categories => Promise.all(categories.map(category => {
      return category.remove();
    })))
    .then(() => [currentPeriod, previousPeriod]);

  })
  .then(([currentPeriod, previousPeriod]) => {

    // move all current transactions
    return Transaction.find({period_id: currentPeriod._id, account_id: accountId})
    .then(transactions => Promise.all(transactions.map(transaction => {
      transaction.period_id = (transactin.type === 'CREDIT')?
        null : previousPeriod._id;
      transaction.category_id = null;
      return transaction.save();
    })))
    .then(() => [currentPeriod, previousPeriod]);

  })
  .then(([currentPeriod, previousPeriod]) => {

    // remove end date from previous period and delete current period
    previousPeriod.end_date = null;
    return Promise.all([previousPeriod.save(), currentPeriod.remove()]);
  });
}

function endPeriod(accountId, periodId) {
  if (!periodId) return;
  return Period.findOne({_id: periodId, account_id: accountId})
  .then(period => {
    if (!period) return;
    period.end_date = rightNow();
    return period.save();
  });
}

function updateAccountPeriod(account, newPeriodId) {
  account.current_period_id = newPeriodId;
  return account.save();
}

function pullInUnusedCredits(accountId, newPeriodId) {
  return Transaction.find({type: 'CREDIT', period_id: null, account_id: accountId})
  .then(transactions => Promise.all(transactions.map(transaction => {
    transaction.period_id = newPeriodId;
    return transaction.save();
  })))
  .then(transactions => transactions.reduce((acc, t) => acc + t.amount, 0));
}

function initializeCategories(accountId, newPeriodId, pastPeriodId, totalCredits) {
  if (!pastPeriodId) return;
  return Category.find({period_id: pastPeriodId, account_id: accountId})
  .then(categories => Promise.all(categories.map(category => {
    let newAmount = (category.allowance_type === '%')?
      totalCredits * category.allowance / 100 : category.allowance;
    return (new Category({
      account_id: accountId,
      period_id: newPeriodId,
      name: category.name,
      allowance: category.allowance,
      allowance_type: category.allowance_type,
      current_limit: newAmount
    })).save();
  })));
}
