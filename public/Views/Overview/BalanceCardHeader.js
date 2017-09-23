import React from 'react';
import classnames from 'classnames';
import Helpers from '../../Helpers.js';

export default function BalanceCardHeader(props) {
  let budget = props.budget;
  let spentPercent = Math.round(budget.debits / budget.credits * 100);
  if (spentPercent > 100 || budget.credits < 0) spentPercent = 100;
  let progressBarClass = classnames({
    'progress-bar': true,
    'surplus': spentPercent <= 75,
    'deficit': spentPercent > 75
  });

  return (
    <div className="card-header no-padding container" role="tab" id={'header' + budget.safe_name}>
      <div className="row card-header-content no-padding">
        <a className="col-10 card-header-button div-button" data-toggle="collapse" data-parent="#accordion" href={'#collapse' + budget.safe_name} aria-expanded="false" aria-controls={'header' + budget.safe_name}>
          {budget.name}
          <span style={{float: 'right'}}>{Helpers.readableAmount(budget.balance)}</span>
        </a>
        <div className="col-2 text-right card-header-button div-button" onClick={budget.onNewTransaction}>
          <i className="fa fa-usd" aria-hidden="true"></i>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </div>
      <div className="progress">
        <div className={progressBarClass} role="progressbar" aria-valuenow={spentPercent}
        aria-valuemin="0" aria-valuemax="100" style={{width:spentPercent + "%"}}>
          <span className="sr-only">{spentPercent}% Complete</span>
        </div>
      </div>
    </div>
  );
}
