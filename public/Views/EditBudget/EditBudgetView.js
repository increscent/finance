import React from "react";
import AddBudgetForm from "../AddBudget/AddBudgetForm.js";
import BackNav from "../Components/BackNav.js";
import Helpers from "../../Helpers.js";
import Store from "../../Store.js";

export default class EditBudgetView extends React.Component {
  constructor(props) {
    super(props);

    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    this.storeListenerId = Store.registerListener(this.forceUpdate);
  }

  componentWillUnmount() {
    Store.unRegisterListener(this.storeListenerId);
  }

  render() {
    let name = Helpers.decodeURIParam(this.props.match.params.name);
    let budget = Store.budgets.find(x => x.name == name);
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
