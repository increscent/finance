import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'

export function TopNav(props) {
  if (!props.isVisible) return null;

  return (
    <div id="top-nav">
      <span><Link to="/overview">Overview</Link></span>
      <span><Link to="/history">History</Link></span>
    </div>
  );
}
