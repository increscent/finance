import { connect } from 'react-redux';
import BudgetView from './budgetView.js';

const mapStateToProps = (state) => ({
  isAdjusting: state.views.budgetView.isAdjusting
});

export default connect(mapStateToProps)(BudgetView);
