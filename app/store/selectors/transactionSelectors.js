export const getDebitsForCategory = (state, categoryId) =>
  state.transactions.filter(
    transaction => transaction.categoryId === categoryId
      && transaction.type === 'DEBIT');

function sortByDate(list) {
  return list.sort((a, b) => (a.date < b.date)? -1 : 1);
}

export const getSortedDebitsForCategory = (state, categoryId) =>
  sortByDate(getDebitsForCategory(state, categoryId));

  export const getCategoryTotalDebits = (state, categoryId) =>
    getDebitsForCategory(state, categoryId)
    .reduce((acc, debit) => acc + debit.amount, 0);
