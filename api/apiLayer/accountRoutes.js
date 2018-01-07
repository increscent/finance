import { Router } from 'express';
import { getAccount } from '../serviceLayer/accountService';

export default Router()

.get('/', function (req, res, next) {
  getAccount(req.accountId)
  .then(account => res.send(JSON.stringify(account)))
  .catch(error => next(error));
});
