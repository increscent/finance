import React from 'react';
import BalanceCardHeader from './BalanceCardHeader.js';
import BalanceCardBody from './BalanceCardBody.js';

export default function BalanceCard(props) {
  var budget = props.budget;
  return (
    <div className="card">
      <BalanceCardHeader budget={budget} />
      <BalanceCardBody budget={budget} />
    </div>
  );
}
