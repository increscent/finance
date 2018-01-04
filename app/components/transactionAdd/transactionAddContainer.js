import { connect } from 'react-redux';
import TransactionAdd from './transactionAdd.js';
import { removeActionView, addTransaction, updateNewTransaction } from '../../store/actions.js';
import selectors from '../../store/selectors/selectors.js';
import { postRequest } from '../../store/api.js';

const mapStateToProps = (state) => ({
  categories: state.categories,
  transaction: selectors.getNewTransaction(state)
});

const mapDispatchToProps = (dispatch) => ({
  onTypeChange: (type) => dispatch(updateNewTransaction({type})),
  onCategoryChange: (categoryId) => dispatch(updateNewTransaction({categoryId})),
  onNameChange: (name) => dispatch(updateNewTransaction({name})),
  onAmountChange: (amount) => dispatch(updateNewTransaction({
    amount: parseFloat(amount)
  })),
  onNoteChange: (note) => dispatch(updateNewTransaction({note})),
  onDateChange: (date) => dispatch(updateNewTransaction({date})),
  onAppliedChange: (applied) => dispatch(updateNewTransaction({applied})),
  onCancel: () => dispatch(removeActionView()),
  onSave: (transaction) => {
    postRequest('/api/transaction', {
      ...transaction,
      categoryId: (transaction.type === 'DEBIT')?
        transaction.categoryId : null,
      date: new Date(transaction.date),
      periodId: (transaction.type === 'CREDIT')?
        (transaction.applied === true? transaction.periodId : null)
        : transaction.periodId
    })
    .then(transaction => dispatch(addTransaction(transaction)))
    .then(() => dispatch(removeActionView()))
    .catch(error => console.log(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionAdd);
