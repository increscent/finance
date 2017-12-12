import Api from './Api.js';

export const SET_BUDGETS = 'set_budgets';

export const fetchBudgets = (dispatch) => {
  Api.getRequest('/api/budget')
  .then(function (response) {
    console.log(response);
    // dispatch({
    //   type: SET_BUDGETS,
    //   data
    // });
  })
  .catch(function (error) {
    console.log(error);
  });
};
