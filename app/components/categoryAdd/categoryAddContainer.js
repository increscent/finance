import { connect } from 'react-redux';
import CategoryAdd from './categoryAdd.js';
import { removeActionView, addCategory, updateNewCategory } from '../../store/actions.js';
import selectors from '../../store/selectors/selectors.js';
import { postRequest } from '../../store/api.js';

const mapStateToProps = (state) => ({
  budgetedFunds: selectors.getTotalBudgetedFunds(state),
  totalCredits: selectors.getTotalAppliedCredits(state),
  category: selectors.getNewCategory(state)
});

const calcCurrentLimit = (allowance, allowanceType, totalCredits) =>
  (allowanceType === '%')?
    allowance * totalCredits / 100
    :
    allowance;

const mapDispatchToProps = (dispatch) => ({
  onNameChange: (name) => dispatch(updateNewCategory({name})),
  onAllowanceTypeChange: (allowanceType, category, totalCredits) => dispatch(updateNewCategory({
    allowanceType,
    currentLimit: calcCurrentLimit(parseFloat(category.allowance), allowanceType, totalCredits)
  })),
  onAllowanceChange: (allowance, category, totalCredits) => dispatch(updateNewCategory({
    allowance: parseFloat(allowance),
    currentLimit: calcCurrentLimit(parseFloat(allowance), category.allowanceType, totalCredits)
  })),
  onCancel: () => dispatch(removeActionView()),
  onSave: (category, totalCredits) => {
    postRequest('/api/category', {
      ...category,
      currentLimit: (category.allowanceType === '%')?
        totalCredits * category.allowance / 100 : category.allowance
    })
    .then(category => dispatch(addCategory(category)))
    .then(() => dispatch(removeActionView()))
    .catch(error => console.log(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd);
