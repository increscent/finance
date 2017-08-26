import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

export default function TopNav(props) {
  return (
    <ul id="top-nav" className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/overview" className={classnames('nav-link', {'active': props.page == 'overview'})}>Overview</Link>
      </li>
      <li className="nav-item">
        <Link to="/history" className={classnames('nav-link', {'active': props.page == 'history'})}>History</Link>
      </li>
    </ul>
  );
}
