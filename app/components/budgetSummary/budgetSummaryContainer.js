import { connect } from 'react-redux';
import BudgetSummary from './budgetSummary.js';
import { setActionView, setBudgetView } from '../../store/actions.js';
import selectors from '../../store/selectors/selectors.js';
import { TRANSACTION_ADD, CATEGORY_ADD } from '../views/actionView/actionView.js';

const mapStateToProps = (state) => ({
  totalCredits: selectors.getTotalAppliedCredits(state),
  totalDebits: selectors.getTotalDebits(state),
  totalBudgetedFunds: selectors.getTotalBudgetedFunds(state),
  isAdjusting: state.views.budgetView.isAdjusting,
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: () =>
    dispatch(setActionView(CATEGORY_ADD)),
  addTransaction: () =>
    dispatch(setActionView(TRANSACTION_ADD)),
  adjustCategories: (categories) =>
    dispatch(setBudgetView(true, categories))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetSummary);
