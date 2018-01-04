export const getTotalBudgetedFunds = (state) =>
  state.categories.reduce((acc, category) => acc + category.currentLimit, 0);

export const getTotalDebits = (state) =>
  state.transactions.filter(transaction => transaction.type === 'DEBIT')
  .reduce((acc, transaction) => acc + transaction.amount, 0);

export const getTotalAppliedCredits = (state) =>
  state.transactions.filter(transaction => transaction.type === 'CREDIT'
    && transaction.periodId)
  .reduce((acc, transaction) => acc + transaction.amount, 0);
