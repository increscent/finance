export function rightNow() {
  var date = new Date();
  return date;
}

export function startOfThisMonth() {
  var date = new Date();
  date.setMonth(thisMonth(), 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfNextMonth() {
  var date = new Date();
  date.setMonth(nextMonth(), 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function thisMonth() {
  return (new Date()).getMonth();
}

export function nextMonth() {
  var new_month = thisMonth() + 1;
  if (new_month > 11) new_month = 0;
  return new_month;
}
