import Api from './Api.js';

export const SET_BUDGETS = 'set_budgets';
export const SET_TRANSACTIONS = 'set_transactions';

export const fetchBudgets = (dispatch) => {
  Api.getRequest('/api/budget')
  .then(function (response) {
    dispatch({
      type: SET_BUDGETS,
      data: response
    });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchTransactions = (dispatch) => {
  Api.getRequest('/api/transaction')
  .then(function (response) {
    dispatch({
      type: SET_TRANSACTIONS,
      data: response
    });
  })
  .catch(function (error) {
    console.log(error);
  });
};
