'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _routeConfig = require('../config/routeConfig');

var _middleware = require('./middleware');

var _categoryService = require('../serviceLayer/categoryService');

exports.default = (0, _express.Router)().get('/', function (req, res, next) {
  if (req.query.periodId === undefined) {
    res.statusCode = 400;
    res.errorMessage = 'Please specify periodId as query string parameter.';
    next();
  }

  (0, _categoryService.getCategories)(req.accountId, req.query.periodId).then(function (categories) {
    return res.send(JSON.stringify(categories));
  }).catch(function (error) {
    res.statusCode = 500;
    next();
  });
}).post('/', (0, _middleware.verifyRequestBody)(_routeConfig.categoryRequiredFields), function (req, res, next) {
  (0, _categoryService.addCategory)(req.accountId, req.body).then(function (category) {
    return res.send(JSON.stringify(category));
  }).catch(function (error) {
    res.statusCode = 500;
    next();
  });
}).put('/:categoryId', (0, _middleware.verifyRequestBody)(_routeConfig.categoryRequiredFields), function (req, res, next) {
  (0, _categoryService.updateCategory)(req.accountId, req.params.categoryId, req.body).then(function (category) {
    return res.send(JSON.stringify({ success: true }));
  }).catch(function (error) {
    res.statusCode = 400;
    res.errorMessage = error;
    next();
  });
}).delete('/:categoryId', function (req, res, next) {
  (0, _categoryService.deleteCategory)(req.accountId, req.params.categoryId).then(function (category) {
    return res.send(JSON.stringify({ success: true }));
  }).catch(function (error) {
    res.statusCode = 400;
    res.errorMessage = error;
    next();
  });
});