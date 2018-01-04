import { setIsLoggedIn, setCurrentPeriodId, addCategories, addTransactions }
  from './actions.js';
import { getRequest } from './api.js';

export const initData = (store) => {
  let cookieName = 'is-logged-in';
  let i = document.cookie.indexOf(cookieName);
  let cookieValue = document.cookie.substr(i + cookieName.length);
  let isLoggedIn = cookieValue.startsWith('=true')? true:false;

  store.dispatch(setIsLoggedIn(isLoggedIn));

  if (store.getState().account.isLoggedIn) {
    getRequest('/api/account')
    .then(account =>
      store.dispatch(setCurrentPeriodId(account.currentPeriodId)))

    .then(() => getRequest('/api/category?periodId='
      + store.getState().account.currentPeriodId))
    .then(categories => store.dispatch(addCategories(categories)))
    .catch(error => console.log(error))
    
    .then(() => getRequest('/api/transaction?periodId='
      + store.getState().account.currentPeriodId))
    .then(transactions => store.dispatch(addTransactions(transactions)))
    .catch(error => console.log(error));
  }
};
