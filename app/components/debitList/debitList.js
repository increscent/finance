import React from 'react';
import { prettyDate } from '../shared/converters.js';

export default (props) => (
  <ul className="debit-credit-list">
    <li className="list-title">
      <div className="info-row">
        <span className="left-align">
          Debits
        </span>
        <span className="right-align">
          <span className="link-button" onClick={() => props.onAdd(props.categoryId)}>
            add debit
          </span>
        </span>
      </div>
    </li>
    {
      props.debits.map(debit =>
        <li key={debit.transactionId}>
          <div className="info-row">
            <span className="left-align">
              {prettyDate(debit.date)}
            </span>
            <span className="right-align">
              ${debit.amount}
            </span>
          </div>
          <div className="info-row">
            <span className="left-align">
              {debit.note}
            </span>
            <span className="right-align">
              <span className="link-button delete-button" onClick={() => props.onDelete(debit.transactionId)}>
                delete
              </span>
            </span>
          </div>
        </li>
      )
    }
  </ul>
);
