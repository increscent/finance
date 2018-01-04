import { Transaction, Category } from '../dataLayer/models';
import { convertTransaction } from '../dataLayer/converters';

export function getTransactions(accountId, periodId) {
  return Transaction.find({
    account_id: accountId,
    $or: [
      {period_id: periodId},
      {period_id: null}
    ]
  })
  .then(transactions => transactions.map(convertTransaction));
}

export function addTransaction(accountId, request) {
  return (new Transaction({
    account_id: accountId,
    period_id: request.periodId,
    category_id: request.categoryId? request.categoryId:undefined,
    type: (request.type.trim() === 'CREDIT')? 'CREDIT':'DEBIT',
    note: request.note,
    amount: parseFloat(request.amount),
    date: request.date
  })).save()
  .then(transaction => {

    if (transaction.type === 'CREDIT' && transaction.period_id) {
      // add percentage of credit to categories in this period
      return Category.find({account_id: accountId, period_id: transaction.period_id, allowance_type: '%'})
      .then(categories => Promise.all(categories.map(category => {
        category.current_limit += category.allowance * transaction.amount / 100;
        return category.save();
      })))
      .then(() => transaction);
    } else {
      return transaction;
    }

  })
  .then(convertTransaction);
}

export function updateTransaction(accountId, transactionId, request) {
  return getTransaction(accountId, transactionId)
  .then(transaction => {
    if (request.periodId !== undefined)
      transaction.period_id = request.periodId;
    if (request.categoryId !== undefined)
      transaction.category_id = request.categoryId;
    if (request.type !== undefined)
      transaction.type = (request.type.trim() === 'CREDIT')? 'CREDIT':'DEBIT';
    if (request.note !== undefined)
      transaction.note = request.note;
    if (request.amount !== undefined)
      transaction.amount = parseFloat(request.amount);
    if (request.date !== undefined)
      transaction.date = request.date;
    return transaction.save();
  });
}

export function deleteTransaction(accountId, transactionId) {
  return getTransaction(accountId, transactionId)
  .then(transaction => transaction.remove());
}

function getTransaction(accountId, transactionId) {
  return Transaction.findOne({account_id: accountId, _id: transactionId})
  .then(transaction => {
    if (transaction) {
      return transaction;
    } else {
      throw {statusCode: 400, message: 'Transaction not found.'};
    }
  })
}
