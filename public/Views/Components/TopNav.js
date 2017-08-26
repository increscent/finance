import React from 'react';
import {Link} from 'react-router-dom';

export default function TopNav(props) {
  return (
    <div id="top-nav">
      <span><Link to="/overview">Overview</Link></span>
      <span><Link to="/history">History</Link></span>
    </div>
  );
}
