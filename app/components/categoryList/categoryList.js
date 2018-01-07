import React from 'react';
import { prettyAmount } from '../shared/converters.js';

export default (props) => (
  <div className="category-list">
    {
      props.categories.map(category =>
        <li key={category.categoryId}>
          <div className="category-name"
            onClick={() => props.openCategory(category.categoryId)}>
            {category.name}
          </div>
          <div className="category-button"
            onClick={() => props.addCategoryDebit(category.categoryId)}>
            ${prettyAmount(category.balance)}
          </div>
        </li>
      )
    }
    <li>
      <div className="category-name"
        onClick={() => props.openCategory(null, true)}>
        Other Transactions
      </div>
    </li>
  </div>
);
