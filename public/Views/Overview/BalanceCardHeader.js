import React from 'react';

export default function BalanceCardHeader(props) {
  let budget = props.budget;

  return (
    <div className="card-header container" role="tab" id={'header' + budget.name}>
      <div className="row">
        <a className="col-10" data-toggle="collapse" data-parent="#accordion" href={'#collapse' + budget.name} aria-expanded="false" aria-controls={'header' + budget.name}>
          {budget.pretty_name}
        </a>
        <div className="col-2 text-right" onClick={budget.onNewTransaction}>
          <i className="fa fa-usd" aria-hidden="true"></i>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
}
