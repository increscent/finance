import { getAccount } from '../serviceLayer/accountService';

export function periodIdOrCurrent(req, res, next, callback) {
  if (req.query.periodId)
    callback(req.query.periodId);
  else
    getAccount(req.accountId)
    .then(account => callback(account.currentPeriodId))
    .catch(error => next(error));
}
