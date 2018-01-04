import { connect } from 'react-redux';
import CategoryDelete from './categoryDelete.js';
import { removeActionView, removeCategory,
  updateTransaction, updateDeleteCategory } from '../../store/actions.js';
import selectors from '../../store/selectors/selectors.js';
import { deleteRequest } from '../../store/api.js';

const mapStateToProps = (state) => ({
  categoryId: state.views.actionView.categoryId,
  transferCategoryId: state.views.actionView.transferCategoryId,
  otherCategories: selectors.getOtherCategories(state, state.views.actionView.categoryId),
  transactions: state.transactions
});

const mapDispatchToProps = (dispatch) => ({
  onTransferCategoryChange: (transferCategoryId) => dispatch(updateDeleteCategory(transferCategoryId)),
  onCancel: () => dispatch(removeActionView()),
  onDelete: (categoryId, transferCategoryId, transactions) => {
    deleteRequest('/api/category/' + categoryId +
      '?transferCategoryId=' + transferCategoryId)
    .then(() => transactions.map(transaction => {
      if (transaction.categoryId === categoryId) {
        dispatch(updateTransaction(transaction.transactionId, {
          categoryId: transferCategoryId
        }));
      }
    }))
    .then(() => dispatch(removeCategory(categoryId)))
    .then(() => dispatch(removeActionView()))
    .catch(error => console.log(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDelete);
