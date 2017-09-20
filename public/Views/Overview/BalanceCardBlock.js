import React from 'react'

export default function BalanceCardBlock(props) {
  let budget = props.budget;
  return (
    <div id={"collapse" + budget.name} className="collapse" role="tabpanel">
      <div className="card-block">
        Hi, I"'"m in here
      </div>
    </div>
  );
}
