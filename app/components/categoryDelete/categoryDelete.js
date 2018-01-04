import React from 'react';

export default (props) => (
  <div className="category-delete">
    <div className="form-row">
      Move all debits in "Food" to:
    </div>

    <div className="form-row">
      <select value={props.transferCategoryId}
        onChange={event => props.onTransferCategoryChange(event.target.value)}>
        {
          props.otherCategories.map(category =>
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          )
        }
      </select>
    </div>

    <div className="form-row">
      Are you sure you want to delete category "Food"?
    </div>

    <div className="form-submit-row">
      <button className="form-button" onClick={props.onCancel}>cancel</button>
      <button className="form-button"
        onClick={() => props.onDelete(props.categoryId, props.transferCategoryId, props.transactions)}>
        delete
      </button>
    </div>
  </div>
);
