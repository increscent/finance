class Transaction {
  removeTransaction(collection, id) {
    var transaction = collection.find(x => x._id == id);
    var index = collection.indexOf(transaction);
    collection.splice(index, 1);
  };
}

module.exports = new Transaction();
