import { Router } from 'express';
import { categoryRequiredFields } from '../config/routeConfig';
import { verifyRequestBody } from './middleware';
import { getCategories, addCategory, updateCategory, deleteCategory }
  from '../serviceLayer/categoryService';

export default Router()

.get('/', function (req, res, next) {
  if (req.query.periodId === undefined) {
    res.statusCode = 400;
    res.errorMessage = 'Please specify periodId as query string parameter.';
    next();
  }

  getCategories(req.accountId, req.query.periodId)
  .then(categories => res.send(JSON.stringify(categories)))
  .catch(error => {
    res.statusCode = 500;
    next();
  });
})

.post('/', verifyRequestBody(categoryRequiredFields),
function (req, res, next) {
  addCategory(req.accountId, req.body)
  .then(category => res.send(JSON.stringify(category)))
  .catch(error => {
    res.statusCode = 500;
    next();
  });
})

.put('/:categoryId', verifyRequestBody(categoryRequiredFields),
function (req, res, next) {
  updateCategory(req.accountId, req.params.categoryId, req.body)
  .then(category => res.send(JSON.stringify({success: true})))
  .catch(error => {
    res.statusCode = 400;
    res.errorMessage = error;
    next();
  });
})

.delete('/:categoryId', function (req, res, next) {
  deleteCategory(req.accountId, req.params.categoryId)
  .then(category => res.send(JSON.stringify({success: true})))
  .catch(error => {
    res.statusCode = 400;
    res.errorMessage = error;
    next();
  });
});
