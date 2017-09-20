import React from 'react';
import BalanceCardTitle from './BalanceCardTitle.js';

export default function BalanceCardHeader(props) {
  let budget = props.budget;
  let title = <BalanceCardTitle budget={budget} />;
  let bootstrapToggleA = React.createElement(
    'a',
    {
      'data-toggle': 'collapse',
      'data-parent': 'accordion',
      'href': '#collapse' + budget.name,
      'aria-expanded': 'true'
    },
    title
  );

  return (
    <div className="card-header" role="tab">
        {bootstrapToggleA}
    </div>
  );
}
