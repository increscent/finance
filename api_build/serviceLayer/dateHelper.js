"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rightNow = rightNow;
exports.startOfThisMonth = startOfThisMonth;
exports.startOfNextMonth = startOfNextMonth;
exports.thisMonth = thisMonth;
exports.nextMonth = nextMonth;
function rightNow() {
  var date = new Date();
  return date;
}

function startOfThisMonth() {
  var date = new Date();
  date.setMonth(thisMonth(), 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfNextMonth() {
  var date = new Date();
  date.setMonth(nextMonth(), 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function thisMonth() {
  return new Date().getMonth();
}

function nextMonth() {
  var new_month = thisMonth() + 1;
  if (new_month > 11) new_month = 0;
  return new_month;
}