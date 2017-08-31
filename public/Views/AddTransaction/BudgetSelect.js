import React from 'react';

export default function BudgetSelect(props) {
  return (
    <span>
      <select value={props.from} onChange={props.onChange} className="form-control">
        {
          props.budgets.map(x => {
            return <option key={x.name} value={x.name}>{x.name}</option>
          })
        }
      </select>
    </span>
  );
}
