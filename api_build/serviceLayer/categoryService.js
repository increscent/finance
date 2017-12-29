'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategories = getCategories;
exports.addCategory = addCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;

var _models = require('../dataLayer/models');

var _converters = require('../dataLayer/converters');

function getCategories(accountId, periodId) {
  return _models.Category.find({ account_id: accountId, period_id: periodId }).then(function (categories) {
    return categories.map(_converters.convertCategory);
  });
}

function addCategory(accountId, request) {
  return new _models.Category({
    account_id: accountId,
    period_id: request.periodId,
    name: request.name,
    allowance: parseFloat(request.allowance),
    allowance_type: request.allowanceType.trim() == '%' ? '%' : '$',
    current_limit: parseFloat(request.currentLimit)
  }).save().then(_converters.convertCategory);
}

function updateCategory(accountId, categoryId, request) {
  return getCategory(accountId, categoryId).then(function (category) {
    category.period_id = request.periodId;
    category.name = request.name;
    category.allowance = parseFloat(request.allowance);
    category.allowance_type = request.allowanceType.trim() == '%' ? '%' : '$';
    category.current_limit = parseFloat(request.currentLimit);
    return category.save();
  });
}

function deleteCategory(accountId, categoryId) {
  return getCategory(accountId, categoryId).then(function (category) {
    return category.remove();
  });
}

function getCategory(accountId, categoryId) {
  return _models.Category.findOne({ account_id: accountId, _id: categoryId }).then(function (category) {
    if (category) {
      return category;
    } else {
      throw 'Category not found.';
    }
  });
}