class Transaction {
  removeTransaction(collection, id) {
    var transaction = collection.find(x => x._id == id);
    var index = collection.indexOf(transaction);
    collection.splice(index, 1);
  };

  getDebitCategories(budgets) {
    var getCategory = function (budget) {
      return {
        id: budget._id,
        category: budget.category
      }
    };
    return getCollectionCategories(budgets, getCategory, (x) => x.category);
  }

  getCreditCategories(credits) {
    return getCollectionCategories(credits, (x) => x.category, (x) => x);
  }
}

module.exports = new Transaction();

function getCollectionCategories(collection, getCategory, getKey) {
  var collectionCategories = [];
  for (var i = 0; i < collection.length; i++) {
    collectionCategories.push(getCategory(collection[i]));
  }
  collectionCategories = noDuplicates(collectionCategories, getKey);
  collectionCategories.sort((a, b) => (getKey(a) < getKey(b))? -1:1);
  return collectionCategories;
}

function noDuplicates(array, getKey) {
  var seen = {};
  var new_array = [];
  for (var i = 0; i < array.length; i++) {
    var key = getKey(array[i]);
    if (!seen[key]) {
      new_array.push(array[i]);
      seen[key] = true;
    }
  }
  return new_array;
}
