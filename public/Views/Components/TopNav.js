import React from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';

function TopNav(props) {
  var goToRoute = function (route) {
    return e => {
      e.preventDefault();
      props.history.push(route);
    };
  };

  return (
    <ul id="top-nav" className="nav nav-tabs">
      <li className="nav-item">
        <a href="#" onClick={goToRoute('/overview')} className={classnames('nav-link', {'active': props.page == 'overview'})}>Overview</a>
      </li>
      <li className="nav-item">
        <a href="#" onClick={goToRoute('/history')} className={classnames('nav-link', {'active': props.page == 'history'})}>History</a>
      </li>

      <div className="btn-group menu-dropdown">
        <button type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <button className="dropdown-item" type="button" onClick={goToRoute('/addTransaction')}>
            + Transaction
          </button>
          <button className="dropdown-item" type="button" onClick={goToRoute('/addBudget')}>
            + Budget
          </button>
          <button className="dropdown-item" type="button">
            <a role="button" href="/logout" className="btn btn-link logout-button">
               Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
            </a>
          </button>
        </div>
      </div>
    </ul>
  );
}

export default withRouter(TopNav);
