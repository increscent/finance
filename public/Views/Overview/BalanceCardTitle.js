import React from 'react'

export default function BalanceCardTitle(props) {
  let budget = props.budget;
  return (
    <div>
      <span>
        {
          budget.name != 'Other' && budget.name != 'Total' &&
          <span className="oi oi-pencil" onClick={budget.onEditBudget}></span>
        }
      </span>
      <span>{budget.pretty_name}</span>
    </div>
  );
}
