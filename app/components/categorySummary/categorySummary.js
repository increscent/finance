import React from 'react';
import { prettyAmount } from '../shared/converters.js';

export default (props) => (
  <div className="category-summary">
    <div className="category-balance">
      Balance: ${prettyAmount(props.currentLimit)} - ${prettyAmount(props.totalDebits)} =
        &nbsp; ${prettyAmount(props.currentLimit - props.totalDebits)}
    </div>
    <span className="link-button" onClick={() => props.onEdit(props.categoryId)}>
      edit
    </span>
    <span className="link-button delete-button" onClick={() => props.onDelete(props.categoryId)}>
      delete
    </span>
  </div>
);
