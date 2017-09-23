class Helpers {
  round(value, decimals) {
    return Number(Math.round(parseFloat(value)+'e'+decimals)+'e-'+decimals).toFixed(decimals);
  }

  readableDate(dateString) {
    let date = new Date(dateString);
    let currentDate = new Date();
    let readableMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = readableMonths[date.getMonth()];
    let day = ' ' + date.getDate();
    let year = (date.getFullYear() != currentDate.getFullYear())? ' ' + date.getFullYear():'';
    return month + day + year;
  }

  encodeURIParam(name) {
    return encodeURI(name).replace(/\//g, '%2F');
  }

  decodeURIParam(uri) {
    if (!uri) return '';
    return uri.replace(/\%2F/g, '/');
  }

  generateSafeName(name) {
    return this.encodeURIParam(name).replace(/\W/g, '');
  }

  readableAmount(amount) {
    var prepend = '$';
    if (amount < 0) {
      prepend = '-$';
      amount *= -1;
    }
    return prepend + this.round(amount, 2);
  }
}

export default new Helpers();
