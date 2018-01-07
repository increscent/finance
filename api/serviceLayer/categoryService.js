import { Category, Transaction } from '../dataLayer/models';
import { convertCategory } from '../dataLayer/converters';

export function getCategories(accountId, periodId) {
  return Category.find({account_id: accountId, period_id: periodId})
  .then(categories => categories.map(convertCategory));
}

export function addCategory(accountId, request) {
  return (new Category({
    account_id: accountId,
    period_id: request.periodId,
    name: request.name,
    allowance: parseFloat(request.allowance),
    allowance_type: (request.allowanceType.trim() == '%')? '%':'$',
    current_limit: parseFloat(request.currentLimit)
  })).save()
  .then(convertCategory);
}

export function updateCategory(accountId, categoryId, request) {
  return getCategory(accountId, categoryId)
  .then(category => {
    if (request.periodId !== undefined)
      category.period_id = request.periodId;
    if (request.name !== undefined)
      category.name = request.name;
    if (request.allowance !== undefined)
      category.allowance = parseFloat(request.allowance);
    if (request.allowanceType !== undefined)
      category.allowance_type = (request.allowanceType.trim() == '%')? '%':'$';
    if (request.currentLimit !== undefined)
      category.current_limit = parseFloat(request.currentLimit);
    return category.save();
  });
}

export function deleteCategory(accountId, categoryId, transferCategoryId) {
  return getCategory(accountId, categoryId)
  .then(category => category.remove())
  .then(() => Transaction.find({category_id: categoryId}))
  .then(categories => Promise.all(categories.map(category => {
    category.category_id = transferCategoryId;
    return category.save();
  })));
}

function getCategory(accountId, categoryId) {
  return Category.findOne({account_id: accountId, _id: categoryId})
  .then(category => {
    if (category) {
      return category;
    } else {
      throw {statusCode: 400, message: 'Category not found.'};
    }
  })
}
