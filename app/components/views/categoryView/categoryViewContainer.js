import { connect } from 'react-redux';
import selectors from '../../../store/selectors/selectors.js';
import CategoryView from './categoryView.js';
import { removeCategoryView } from '../../../store/actions.js';

const mapStateToProps = (state) => ({
  categoryId: state.views.categoryView.categoryId,
  isOtherTransactions: state.views.categoryView.isOtherTransactions,
  title: state.views.categoryView.isOtherTransactions?
    'Other Transactions' : selectors.getCategory(state, state.views.categoryView.categoryId).name
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(removeCategoryView())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
