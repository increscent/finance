import React from 'react';

export default (props) => (
  <ul className="debit-credit-list">
    <li className="list-title">
      <div className="info-row">
        <span className="left-align">
          Credits
        </span>
        <span className="right-align">
          <span className="link-button">add credit</span>
        </span>
      </div>
    </li>
    <li>
      <div className="info-row">
        <span className="left-align">
          15 Oct 2017
        </span>
        <span className="right-align">
          (applied) $25.00
        </span>
      </div>
      <div className="info-row">
        <span className="left-align">
          Birthday something really really long
        </span>
        <span className="right-align">
          <span className="link-button">unapply</span>
          <span className="link-button delete-button">delete</span>
        </span>
      </div>
    </li>
    <li>
      <div className="info-row">
        <span className="left-align">
          14 Oct 2017
        </span>
        <span className="right-align">
          (unapplied) $500.00
        </span>
      </div>
      <div className="info-row">
        <span className="left-align">
          Paycheck
        </span>
        <span className="right-align">
          <span className="link-button">apply</span>
          <span className="link-button delete-button">delete</span>
        </span>
      </div>
    </li>
  </ul>
);
