import { Period } from '../dataLayer/models';
import { convertPeriod } from '../dataLayer/converters';

export function getPeriods(accountId) {
  return Period.find({account_id: accountId})
  .then(periods => periods.map(convertPeriod));
}
