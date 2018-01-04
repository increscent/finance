import { connect } from 'react-redux';
import selectors from '../../store/selectors/selectors.js';
import CategorySummary from './categorySummary.js';
import { setCategoryView, setActionView } from '../../store/actions.js';
import { CATEGORY_DELETE } from '../views/actionView/actionView.js';

const mapStateToProps = (state) => ({
  categoryId: state.views.categoryView.categoryId,
  currentLimit: selectors.getCategory(state, state.views.categoryView.categoryId).currentLimit,
  totalDebits: selectors.getCategoryTotalDebits(state, state.views.categoryView.categoryId)
});

const mapDispatchToProps = (dispatch) => ({
  onEdit: (categoryId) => dispatch(setCategoryView(categoryId, true)),
  onDelete: (categoryId) => dispatch(setActionView(DELETE_CATEGORY, {categoryId}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySummary);
