import { ADD_TRANSACTION, ADD_TRANSACTIONS, REMOVE_TRANSACTION } from '../actions.js';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return [...state, action.transaction];
    case ADD_TRANSACTIONS:
      return [...state, ...action.transactions];
    case REMOVE_TRANSACTION:
      let transactionIndex = state.findIndex(transaction =>
        transaction.transactionId === action.transactionId);
      if (transactionIndex === -1) {
        return state;
      } else {
        return [
          ...state.slice(0, transactionIndex),
          ...state.slice(transactionIndex + 1)
        ];
      }
    default:
      return state;
  }
};
