import { SET_ACTION_VIEW, REMOVE_ACTION_VIEW, UPDATE_NEW_CATEGORY, UPDATE_NEW_TRANSACTION }
  from '../actions.js';
import { CATEGORY_ADD, CATEGORY_DELETE, TRANSACTION_ADD }
  from '../../components/views/actionView/actionView.js';

const isoDate = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return date.getFullYear() + '-'
    + (month < 10? '0' + month:month) + '-'
    + (day < 10? '0' + day:day);
}

export default (state = null, action, globalState) => {
  switch (action.type) {
    case SET_ACTION_VIEW:
      switch (action.actionType) {
        case CATEGORY_ADD:
          return {
            actionType: action.actionType,
            category: {
              allowanceType: '$',
              name: '',
              allowance: '',
              periodId: globalState.account.currentPeriodId
            }
          };
        case TRANSACTION_ADD:
          let categoryId = (action.actionProperties && action.actionProperties.categoryId) ||
            ((globalState.categories[0])? globalState.categories[0].categoryId : '');
          let type = (action.actionProperties && action.actionProperties.type) || 'CREDIT';
          let date = isoDate(new Date());

          return {
            actionType: action.actionType,
            transaction: {
              type,
              categoryId,
              amount: '',
              note: '',
              date,
              applied: false,
              periodId: globalState.account.currentPeriodId
            }
          }
        default:
          return {
            actionType: action.actionType
          };
      }
    case UPDATE_NEW_CATEGORY:
      return {
        ...state,
        category: {
          ...state.category,
          ...action.category
        }
      };
    case UPDATE_NEW_TRANSACTION:
      return {
        ...state,
        transaction: {
          ...state.transaction,
          ...action.transaction
        }
      };
    case REMOVE_ACTION_VIEW:
      return null;
    default:
      return state;
  }
}
