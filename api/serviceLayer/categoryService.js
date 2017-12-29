import { Category } from '../dataLayer/models';
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
    category.period_id = request.periodId;
    category.name = request.name;
    category.allowance = parseFloat(request.allowance);
    category.allowance_type = (request.allowanceType.trim() == '%')? '%':'$';
    category.current_limit = parseFloat(request.currentLimit);
    return category.save();
  });
}

export function deleteCategory(accountId, categoryId) {
  return getCategory(accountId, categoryId)
  .then(category => {
    return category.remove();
  });
}

function getCategory(accountId, categoryId) {
  return Category.findOne({account_id: accountId, _id: categoryId})
  .then(category => {
    if (category) {
      return category
    } else {
      throw 'Category not found.';
    }
  })
}
