class AccountService {
  constructor() {
    let cookieName = 'is-logged-in';
    let i = document.cookie.indexOf(cookieName);
    let cookieValue = document.cookie.substr(i + cookieName.length);
    this.isLoggedIn = cookieValue.startsWith('=true')? true:false;
  }
}

export default new AccountService();
