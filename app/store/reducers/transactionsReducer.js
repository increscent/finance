import { ADD_TRANSACTION, ADD_TRANSACTIONS, REMOVE_TRANSACTION, UPDATE_TRANSACTION } from '../actions.js';

export default (state = [], action) => {
  let index = -1;
  switch (action.type) {
    case ADD_TRANSACTION:
      return [...state, action.transaction];
    case ADD_TRANSACTIONS:
      return [...state, ...action.transactions];
    case REMOVE_TRANSACTION:
      index = findIndex(state, action.transactionId)
      if (index === -1) return state;

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    case UPDATE_TRANSACTION:
      index = findIndex(state, action.transactionId);
      if (index === -1) return state;

      let transaction = state[index];
      return [
        ...state.slice(0, index),
        {
          ...transaction,
          ...action.transaction
        },
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

function findIndex(transactions, transactionId) {
  return transactions.findIndex(transaction =>
    transaction.transactionId === transactionId);
}
