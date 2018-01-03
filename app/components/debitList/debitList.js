import React from 'react';

export default (props) => (
  <ul className="debit-credit-list">
    <li className="list-title">
      <div className="info-row">
        <span className="left-align">
          Debits
        </span>
        <span className="right-align">
          <span className="link-button">add debit</span>
        </span>
      </div>
    </li>
    <li>
      <div className="info-row">
        <span className="left-align">
          20 Oct 2017
        </span>
        <span className="right-align">
          $25.00
        </span>
      </div>
      <div className="info-row">
        <span className="left-align">
          Walmart
        </span>
        <span className="right-align">
          <span className="link-button delete-button">delete</span>
        </span>
      </div>
    </li>
    <li>
      <div className="info-row">
        <span className="left-align">
          19 Oct 2017
        </span>
        <span className="right-align">
          $5.00
        </span>
      </div>
      <div className="info-row">
        <span className="left-align">
          Ice Cream
        </span>
        <span className="right-align">
          <span className="link-button delete-button">delete</span>
        </span>
      </div>
    </li>
  </ul>
);
