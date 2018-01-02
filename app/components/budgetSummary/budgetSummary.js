import React from 'react';

export default (props) => (
  <div className="budget-summary">
    <div className="summary-row">
      Balance: $840.00 - $50.00 = $790.00
    </div>
    <div className="summary-row">
      Unbudgeted funds: $40.00
    </div>
    <span className="link-button">add category</span>
    <span className="link-button">add transaction</span>
    <span className="link-button">adjust budget</span>
  </div>
);
