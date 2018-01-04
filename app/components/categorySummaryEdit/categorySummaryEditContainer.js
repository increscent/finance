import { connect } from 'react-redux';
import CategorySummaryEdit from './categorySummaryEdit.js';
import { setCategoryView, setActionView, updateCategory, editCategory } from '../../store/actions.js';
import { CATEGORY_DELETE } from '../views/actionView/actionView.js';
import selectors from '../../store/selectors/selectors.js';
import { putRequest } from '../../store/api.js';

const mapStateToProps = (state) => ({
  budgetedFunds: selectors.getOtherBudgetedFunds(state),
  totalCredits: selectors.getTotalAppliedCredits(state),
  category: selectors.getEditCategory(state),
  totalDebits: selectors.getCategoryTotalDebits(state, state.views.categoryView.categoryId)
});

const calcCurrentLimit = (allowance, allowanceType, totalCredits) =>
  (allowanceType === '%')?
    allowance * totalCredits / 100
    :
    allowance;

const mapDispatchToProps = (dispatch) => ({
  onCurrentLimitChange: (currentLimit) => dispatch(editCategory({
    currentLimit: parseFloat(currentLimit)
  })),
  onNameChange: (name) => dispatch(editCategory({name})),
  onAllowanceTypeChange: (allowanceType, category, totalCredits) => dispatch(editCategory({
    allowanceType,
    currentLimit: calcCurrentLimit(category.allowance, allowanceType, totalCredits)
  })),
  onAllowanceChange: (allowance, category, totalCredits) => dispatch(editCategory({
    allowance: parseFloat(allowance),
    currentLimit: calcCurrentLimit(parseFloat(allowance), category.allowanceType, totalCredits)
  })),
  onCancel: (categoryId) => dispatch(setCategoryView(categoryId)),
  onSave: (category) => {
    putRequest('/api/category/' + category.categoryId, category)
    .then(() => dispatch(updateCategory(category.categoryId, category)))
    .then(() => dispatch(setCategoryView(category.categoryId)))
    .catch(error => console.log(error));
  },
  onDelete: (categoryId) => dispatch(setActionView(CATEGORY_DELETE, {categoryId}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySummaryEdit);
