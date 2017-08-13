export default class HistoryModel {
  constructor() {
    this.transactions = [];
  //   this.transactions = [ { category: 'Paycheck',
  //   motive: 'yep',
  //   amount: 80,
  //   date: '2017-08-11T05:21:25.710Z',
  //   _id: '598d3ed503433d29f4144a13' },
  // { category: 'Paycheck',
  //   motive: 'yep',
  //   amount: 80,
  //   date: '2017-08-11T05:24:35.336Z',
  //   _id: '598d3f9303433d29f4144a16' },
  // { category: 'Tithing',
  //   motive: 'tithing',
  //   amount: 5,
  //   date: '2017-08-11T05:24:04.705Z',
  //   _id: '598d3f7403433d29f4144a14' },
  // { category: 'Tithing',
  //   motive: 'tithing',
  //   amount: 10,
  //   date: '2017-08-11T05:24:11.094Z',
  //   _id: '598d3f7b03433d29f4144a15' },
  // { category: 'Food',
  //   motive: 'Harmon\'s',
  //   amount: 80,
  //   date: '2017-08-12T00:28:14.418Z',
  //   _id: '598e4b9e97660412fffa1c78' },
  // { category: 'Other',
  //   motive: 'watch',
  //   amount: 20,
  //   date: '2017-08-12T00:29:18.429Z',
  //   _id: '598e4bde97660412fffa1c79' } ];
  }

  updateTransactions(transactions) {
    this.transactions = transactions;
  }
}
