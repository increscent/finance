import React from 'react';
import {Link} from 'react-router-dom';

export default function BottomNav(props) {
  return (
    <div id="bottom-nav" className="container">
      <div className="row">
        <div className="col-5 ml-auto">
          <Link to="/addTransaction" className="btn btn-outline-primary">+ Transaction</Link>
        </div>
        <div className="col-5 mr-auto">
          <Link to="/addBudget" className="btn btn-outline-primary">+ Budget</Link>
        </div>
      </div>
    </div>
  );
}
