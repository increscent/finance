import { Router } from 'express';
import { getPeriods } from '../serviceLayer/periodService';

export default Router()

.get('/', function (req, res, next) {
  getPeriods(req.accountId)
  .then(periods => res.send(JSON.stringify(periods)))
  .catch(error => {
    res.statusCode = 500;
    next();
  });
});
