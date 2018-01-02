import React from 'react';

export default (props) => (
  <ul className="category-list-adjust">
    <li>
      <div className="category-name-adjust">
        Food
      </div>
      <div className="category-balance-adjust">
        $ <input type="number" className="allowance-edit" defaultValue="150" /> - $30.00 = $120.00
      </div>
    </li>
    <li>
      <div className="category-name-adjust">
        Gas
      </div>
      <div className="category-balance-adjust">
        $ <input type="number" className="allowance-edit" defaultValue="50" /> - $0.00 = $50.00
      </div>
    </li>
  </ul>
);
