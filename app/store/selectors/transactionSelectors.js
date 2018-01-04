export const getDebitsForCategory = (state, categoryId) =>
  state.transactions.filter(
    transaction => transaction.categoryId === categoryId
      && transaction.type === 'DEBIT');

export const getDebitsWithoutCategory = (state) =>
  state.transactions.filter(transaction =>
    transaction.type === 'DEBIT' && !transaction.categoryId);

function sortByDate(list) {
  return list.sort((a, b) => (new Date(a.date) > new Date(b.date))? -1 : 1);
}

export const getSortedDebitsForCategory = (state, categoryId) =>
  sortByDate(getDebitsForCategory(state, categoryId));

export const getSortedDebitsWithoutCategory = (state) =>
  sortByDate(getDebitsWithoutCategory(state));

export const getSortedCredits = (state) =>
  sortByDate(state.transactions.filter(transaction => transaction.type === 'CREDIT'));

export const getCategoryTotalDebits = (state, categoryId) =>
  getDebitsForCategory(state, categoryId)
  .reduce((acc, debit) => acc + debit.amount, 0);

export const getNewTransaction = (state) =>
  state.views.actionView.transaction;
