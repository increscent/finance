import { connect } from 'react-redux';
import CategoryAdd from './categoryAdd.js';
import { removeActionView, addCategory, updateNewCategory } from '../../store/actions.js';
import selectors from '../../store/selectors/selectors.js';
import { postRequest } from '../../store/api.js';

const mapStateToProps = (state) => ({
  unbudgetedFunds: selectors.getTotalAppliedCredits(state) - selectors.getTotalBudgetedFunds(state),
  category: {
    ...selectors.getNewCategory(state),
    totalCredits: selectors.getTotalAppliedCredits(state),
    periodId: state.account.currentPeriodId
  }
});

const mapDispatchToProps = (dispatch) => ({
  onNameChange: (name) => dispatch(updateNewCategory({name})),
  onAllowanceTypeChange: (allowanceType) => dispatch(updateNewCategory({allowanceType})),
  onAllowanceChange: (allowance) => dispatch(updateNewCategory({allowance})),
  onCancel: () => dispatch(removeActionView()),
  onSave: (category) => {
    postRequest('/api/category', {
      ...category,
      allowance: parseFloat(category.allowance),
      currentLimit: (category.allowanceType === '%')?
        category.totalCredits * parseFloat(category.allowance) / 100 : parseFloat(category.allowance),
      totalCredits: null
    })
    .then(category => dispatch(addCategory(category)))
    .then(() => dispatch(removeActionView()))
    .catch(error => console.log(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd);
