import { connect } from 'react-redux';
import CategoryListAdjust from './categoryListAdjust.js';
import { setBudgetView, adjustCategory, updateCategory } from '../../store/actions.js';
import selectors from '../../store/selectors/selectors.js';
import { putRequest } from '../../store/api.js';

const mapStateToProps = (state) => ({
  totalCredits: selectors.getTotalAppliedCredits(state),
  budgetedFunds: selectors.getAdjustedBudgetedFunds(state),
  categories: selectors.getAdjustedCategoriesWithDebits(state)
});

const mapDispatchToProps = (dispatch) => ({
  adjustCategory: (categoryId, currentLimit) =>
    dispatch(adjustCategory(categoryId, currentLimit)),
  onCancel: () =>
    dispatch(setBudgetView(false)),
  onSave: (categories) => {
    Promise.all(categories
      .filter(category => category.currentLimit !== category.previousLimit)
      .map(category => putRequest('/api/category/' + category.categoryId, {
        categoryId: category.categoryId,
        currentLimit: category.currentLimit
      }).then(() => category))
    )
    .then(categories => categories.map(category =>
      dispatch(updateCategory(category.categoryId, {currentLimit: category.currentLimit}))))
    .then(() => dispatch(setBudgetView(false)))
    .catch(error => console.log(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListAdjust);
