const abbreviatedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const prettyDate = (date) => {
  let d = new Date(date);
  return d.getUTCDate() + ' ' + abbreviatedMonths[d.getUTCMonth()] +
  ' ' + d.getUTCFullYear();
};

export const prettyAmount = (amount) =>
  parseFloat(amount).toFixed(2);
