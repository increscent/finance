import { Router } from 'express';
import { transactionRequiredFields } from '../config/routeConfig';
import { verifyRequestBody } from './middleware';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction }
  from '../serviceLayer/transactionService';
import { periodIdOrCurrent } from './routeHelper';

export default Router()

.get('/', function (req, res, next) {
  periodIdOrCurrent(req, res, next, (periodId) => {
    getTransactions(req.accountId, periodId)
    .then(transactions => res.send(JSON.stringify(transactions)))
    .catch(error => next(error));
  });
})

.post('/', verifyRequestBody(transactionRequiredFields),
function (req, res, next) {
  addTransaction(req.accountId, req.body)
  .then(transaction => res.send(JSON.stringify(transaction)))
  .catch(error => next(error));
})

.put('/:transactionId', function (req, res, next) {
  updateTransaction(req.accountId, req.params.transactionId, req.body)
  .then((transaction) => res.send(JSON.stringify({success: true})))
  .catch(error => next(error));
})

.delete('/:transactionId', function (req, res, next) {
  deleteTransaction(req.accountId, req.params.transactionId)
  .then((transaction) => res.send(JSON.stringify({success: true})))
  .catch(error => next(error));
});
