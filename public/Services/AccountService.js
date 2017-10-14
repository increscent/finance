export default class AccountService {
  constructor() {
    let cookieName = 'is-logged-in';
    let i = document.cookie.indexOf(cookieName);
    let cookieValue = document.cookie.substr(i + cookieName.length);
    this.isLoggedIn = cookieValue.startsWith('=true')? true:false;
    this.periodId = null;
    this.period = {
      // _id: "59cf1648d8863f27a13e24bc"
    };
  }
}
