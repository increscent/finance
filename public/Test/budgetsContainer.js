import { connect } from 'react-redux';
import Budgets from './budgetsComponent.js';

const mapStateToProps = state => {
  return {
    todos: state.budgets
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

const BudgetsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Budgets);

export default BudgetsList;
