class DateHelper {
  rightNow() {
    var date = new Date();
    return date;
  }

  startOfThisMonth() {
    var date = new Date();
    date.setMonth(this.thisMonth(), 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  startOfNextMonth() {
    var date = new Date();
    date.setMonth(this.nextMonth(), 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  thisMonth() {
    return (new Date()).getMonth();
  }

  nextMonth() {
    var new_month = this.thisMonth() + 1;
    if (new_month > 11) new_month = 0;
    return new_month;
  }
}

module.exports = new DateHelper();
