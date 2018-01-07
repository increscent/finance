import { Router } from 'express';
import { getPeriods, createPeriod, deleteCurrentPeriod } from '../serviceLayer/periodService';

export default Router()

.get('/', function (req, res, next) {
  getPeriods(req.accountId)
  .then(periods => res.send(JSON.stringify(periods)))
  .catch(error => next(error));
})

.post('/', function (req, res, next) {
  createPeriod(req.accountId)
  .then(period => res.send(JSON.stringify(period)))
  .catch(error => next(error));
})

.delete('/', function (req, res, next) {
  deleteCurrentPeriod(req.accountId)
  .then(() => res.send(JSON.stringify({success: true})))
  .catch(error => next(error));
});
