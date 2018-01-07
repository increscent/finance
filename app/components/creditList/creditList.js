import React from 'react';
import { prettyDate, prettyAmount } from '../shared/converters.js';

export default (props) => (
  <ul className="debit-credit-list">
    <li className="list-title">
      <div className="info-row">
        <span className="left-align">
          Credits
        </span>
        <span className="right-align">
          <span className="link-button" onClick={props.onAdd}>add credit</span>
        </span>
      </div>
    </li>
    {
      props.credits.map(credit =>
        <li key={credit.transactionId}>
          <div className="info-row">
            <span className="left-align">
              {prettyDate(credit.date)}
            </span>
            <span className="right-align">
              {credit.periodId? '(applied)' : '(unapplied)'}
              &nbsp; ${prettyAmount(credit.amount)}
            </span>
          </div>
          <div className="info-row">
            <span className="left-align">
              {credit.note}
            </span>
            <span className="right-align">
              {
                (credit.periodId)?
                <span className="link-button" onClick={() => props.onUnapply(credit.transactionId)}>
                  unapply
                </span>
                :
                <span className="link-button" onClick={() => props.onApply(credit.transactionId, props.currentPeriodId)}>
                  apply
                </span>
              }
              <span className="link-button delete-button"
                onClick={() => props.onDelete(credit.transactionId)}>
                delete
              </span>
            </span>
          </div>
        </li>
      )
    }
  </ul>
);
