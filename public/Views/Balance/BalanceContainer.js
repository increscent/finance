import { connect } from 'react-redux';
import BalanceList from './BalanceList.js';

let getBudgetBalance = (name, budgets, transactions) => {
  let budgetCredits = transactions
    .filter(t => t.to === name)
    .reduce((acc, t) => acc + t.amount, 0);
  let budgetDebits = transactions
    .filter(t => t.from === name && t.to === '@Debit')
    .reduce((acc, t) => acc + t.amount, 0);

  switch (name) {
    case 'Other':
      break;
    case 'Total':
      let totalCredits = transactions
        .filter(t => t.from === '@Credit')
        .reduce((acc, t) => acc + t.amount, 0);
      break;
    default:
      return {
        name: name,
        credits: budgetCredits,
        debits: budgetDebits,
        balance: budgetCredits - budgetDebits
      };
  }
};

const mapStateToProps = state => {
  return {
    balances: [..state.budgets, {name: 'Total'}].map(
      budget => getBudgetBalance(budget.name, state.budgets, state.transactions)
    );
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

const BalanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Budgets);

export default BalanceContainer;
