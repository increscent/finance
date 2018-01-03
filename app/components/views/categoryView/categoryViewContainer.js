import { connect } from 'react-redux';
import CategoryView from './categoryView.js';
import { removeCategoryView } from '../../../store/actions.js';

const mapStateToProps = (state) => ({
  categoryId: state.views.categoryView.categoryId,
  isEditing: state.views.categoryView.isEditing,
  isOtherTransactions: state.views.categoryView.isOtherTransactions
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(removeCategoryView())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
