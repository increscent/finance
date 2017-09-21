import React from 'react';
import AddBudgetForm from '../AddBudget/AddBudgetForm.js';
import BackNav from '../Components/BackNav.js';
import BudgetService from '../../Services/BudgetService.js';
import Helpers from '../Helpers.js';

export default class EditBudgetView extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    this.budgetServiceListenerId = BudgetService.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    BudgetService.unRegisterListener(this.budgetServiceListenerId);
  }

  render() {
    let name = Helpers.decodeURIParam(this.props.match.params.name);
    let budget = BudgetService.getBudgets().find(x => x.name == name);
    return (
      <div>
        <BackNav title={"Edit Budget \"" + name + "\""} />
          <div className="container">
            {
              budget? // budget must be set in order to edit it
              <AddBudgetForm uri={budget.name} name={budget.name} allowanceType={budget.allowance_type} allowance={budget.allowance} />
              :
              <div className="alert alert-warning" role="alert">
                The specified budget was not found :(
              </div>
            }

          </div>
      </div>
    );
  }
}
