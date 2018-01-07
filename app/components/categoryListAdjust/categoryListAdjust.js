import React from 'react';
import { prettyAmount } from '../shared/converters.js';

export default (props) => (
  <ul className="category-list-adjust">
    <li>
      <div className="category-name-adjust">
        Total funds: ${prettyAmount(props.totalCredits)}
      </div>
      <div className="category-balance-adjust">
        Unbudgeted funds: ${prettyAmount(props.totalCredits - (props.budgetedFunds || 0))}
      </div>
    </li>
    {
      props.categories.map(category =>
        <li key={category.categoryId}>
          <div className="category-name-adjust">
            { category.name }
          </div>
          <div className="category-balance-adjust">
            $ <input type="number" step=".01" className="allowance-edit" value={category.currentLimit}
              onChange={event => props.adjustCategory(category.categoryId, event.target.value)} />
              &nbsp;- ${prettyAmount(category.debits)} = ${prettyAmount((category.currentLimit || 0) - category.debits)}
          </div>
        </li>
      )
    }
    <div className="form-submit-row">
      <button className="form-button" onClick={props.onCancel}>cancel</button>
      <button className="form-button" onClick={() => props.onSave(props.categories)}>save</button>
    </div>
  </ul>
);
