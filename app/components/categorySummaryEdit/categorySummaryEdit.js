import React from 'react';
import CategoryEdit from '../categoryEdit/categoryEdit.js';

export default (props) => (
  <div className="category-summary-edit">
    <CategoryEdit {...props} onCancel={() => props.onCancel(props.category.categoryId)}/>
    <span className="link-button delete-button"
      onClick={() => props.onDelete(props.category.categoryId)}>
      delete
    </span>
  </div>
);
