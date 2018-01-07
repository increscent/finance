import { connect } from 'react-redux';
import DebitList from './debitList.js';
import selectors from '../../store/selectors/selectors.js';
import { setActionView, removeTransaction } from '../../store/actions.js';
import { TRANSACTION_ADD } from '../views/actionView/actionView.js';
import { deleteRequest } from '../../store/api.js';

const mapStateToProps = (state, ownProps) => ({
  categoryId: ownProps.categoryId,
  debits: ownProps.isOtherTransactions?
    selectors.getSortedDebitsWithoutCategory(state) :
    selectors.getSortedDebitsForCategory(state, ownProps.categoryId)
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: (categoryId) => dispatch(setActionView(TRANSACTION_ADD, {categoryId, type: 'DEBIT'})),
  onDelete: (transactionId) => {
    deleteRequest('/api/transaction/' + transactionId)
    .then(() => dispatch(removeTransaction(transactionId)))
    .catch(error => console.log(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DebitList)
