'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _routeConfig = require('../config/routeConfig');

var _middleware = require('./middleware');

var _categoryService = require('../serviceLayer/categoryService');

exports.default = (0, _express.Router)().get('/', function (req, res, next) {
  if (!req.query.periodId) return next({
    statusCode: 400,
    message: 'Please specify periodId as query string parameter.'
  });

  (0, _categoryService.getCategories)(req.accountId, req.query.periodId).then(function (categories) {
    return res.send(JSON.stringify(categories));
  }).catch(function (error) {
    return next(error);
  });
}).post('/', (0, _middleware.verifyRequestBody)(_routeConfig.categoryRequiredFields), function (req, res, next) {
  (0, _categoryService.addCategory)(req.accountId, req.body).then(function (category) {
    return res.send(JSON.stringify(category));
  }).catch(function (error) {
    return next(error);
  });
}).put('/:categoryId', function (req, res, next) {
  (0, _categoryService.updateCategory)(req.accountId, req.params.categoryId, req.body).then(function (category) {
    return res.send(JSON.stringify({ success: true }));
  }).catch(function (error) {
    return next(error);
  });
}).delete('/:categoryId', function (req, res, next) {
  if (req.query.transferCategoryId === undefined) next({ statusCode: 400, message: 'Please specify transferCategoryId as query string parameter.' });

  (0, _categoryService.deleteCategory)(req.accountId, req.params.categoryId, req.query.transferCategoryId).then(function (category) {
    return res.send(JSON.stringify({ success: true }));
  }).catch(function (error) {
    return next(error);
  });
});