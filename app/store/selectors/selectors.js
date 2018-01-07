import * as balanceSelectors from './balanceSelectors.js';
import * as categorySelectors from './categorySelectors.js';
import * as transactionSelectors from './transactionSelectors.js';

export default {
  ...balanceSelectors,
  ...categorySelectors,
  ...transactionSelectors
}
