import { Router } from 'express';
import { categoryRequiredFields } from '../config/routeConfig';
import { verifyRequestBody } from './middleware';
import { getCategories, addCategory, updateCategory, deleteCategory }
  from '../serviceLayer/categoryService';
import { periodIdOrCurrent } from './routeHelper';

export default Router()

.get('/', function (req, res, next) {
  periodIdOrCurrent(req, res, next, (periodId) => {
    getCategories(req.accountId, periodId)
    .then(categories => res.send(JSON.stringify(categories)))
    .catch(error => next(error));
  });
})

.post('/', verifyRequestBody(categoryRequiredFields),
function (req, res, next) {
  addCategory(req.accountId, req.body)
  .then(category => res.send(JSON.stringify(category)))
  .catch(error => next(error));
})

.put('/:categoryId', function (req, res, next) {
  updateCategory(req.accountId, req.params.categoryId, req.body)
  .then(category => res.send(JSON.stringify({success: true})))
  .catch(error => next(error));
})

.delete('/:categoryId', function (req, res, next) {
  if (req.query.transferCategoryId === undefined)
    next({statusCode: 400, message: 'Please specify transferCategoryId as query string parameter.'});

  deleteCategory(req.accountId, req.params.categoryId, req.query.transferCategoryId)
  .then(category => res.send(JSON.stringify({success: true})))
  .catch(error => next(error));
});
