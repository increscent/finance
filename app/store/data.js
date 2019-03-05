import { setIsLoggedIn, setCurrentPeriodId, addCategories, addTransactions }
    from './actions.js';
import { getRequest } from './api.js';

export const initData = (getState, dispatch) => {
    let cookieName = 'is-logged-in';
    let i = document.cookie.indexOf(cookieName);
    let cookieValue = document.cookie.substr(i + cookieName.length);
    let isLoggedIn = cookieValue.startsWith('=true')? true:false;

    dispatch(setIsLoggedIn(isLoggedIn));

    if (getState().account.isLoggedIn) {
        getRequest('/api/account')
        .then(account =>
            dispatch(setCurrentPeriodId(account.currentPeriodId)))

        .then(() => getRequest('/api/category?periodId='
            + getState().account.currentPeriodId))
        .then(categories => dispatch(addCategories(categories)))
        .catch(error => console.log(error))

        .then(() => getRequest('/api/transaction?periodId='
            + getState().account.currentPeriodId))
        .then(transactions => dispatch(addTransactions(transactions)))
        .catch(error => console.log(error));
    }
};
