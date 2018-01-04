import { connect } from 'react-redux';
import CreditList from './creditList.js';
import selectors from '../../store/selectors/selectors.js';
import { setActionView, removeTransaction, updateTransaction } from '../../store/actions.js';
import { TRANSACTION_ADD } from '../views/actionView/actionView.js';
import { deleteRequest, putRequest } from '../../store/api.js';

const mapStateToProps = (state) => ({
  credits: selectors.getSortedCredits(state),
  currentPeriodId: state.account.currentPeriodId
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => dispatch(setActionView(TRANSACTION_ADD, {type: 'CREDIT'})),
  onUnapply: (transactionId) => {
    putRequest('/api/transaction/' + transactionId, {periodId: null})
    .then(() => dispatch(updateTransaction(transactionId, {periodId: null})))
    .catch(error => console.log(error));
  },
  onApply: (transactionId, periodId) => {
    putRequest('/api/transaction/' + transactionId, {periodId})
    .then(() => dispatch(updateTransaction(transactionId, {periodId})))
    .catch(error => console.log(error));
  },
  onDelete: (transactionId) => {
    deleteRequest('/api/transaction/' + transactionId)
    .then(() => dispatch(removeTransaction(transactionId)))
    .catch(error => console.log(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditList);
