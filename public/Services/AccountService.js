import ApiService from "./ApiService.js";

export default class AccountService {
  constructor() {
    let cookieName = 'is-logged-in';
    let i = document.cookie.indexOf(cookieName);
    let cookieValue = document.cookie.substr(i + cookieName.length);
    this.isLoggedIn = cookieValue.startsWith('=true')? true:false;
    this.periodId = null;
  }

  fetchPeriods() {
    return ApiService.getRequest('/api/account/periods', null);
  }
}
