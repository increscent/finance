import { connect } from 'react-redux';
import CategoryList from './categoryList.js';
import { setCategoryView, setActionView } from '../../store/actions.js';
import selectors from '../../store/selectors/selectors.js';
import { TRANSACTION_ADD } from '../views/actionView/actionView.js';

const mapStateToProps = (state) => ({
  categories: selectors.getCategoriesWithBalance(state)
});

const mapDispatchToProps = (dispatch) => ({
  openCategory: (categoryId, isOtherTransactions) =>
    dispatch(setCategoryView(categoryId, false, isOtherTransactions)),
  addCategoryDebit: (categoryId) =>
    dispatch(setActionView(TRANSACTION_ADD, {categoryId, type: 'DEBIT'}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
