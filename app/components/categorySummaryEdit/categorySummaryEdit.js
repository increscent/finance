import React from 'react';
import CategoryEdit from '../categoryEdit/categoryEdit.js';

export default (props) => (
  <div className="category-summary-edit">
    <categoryEdit />
    <span className="link-button delete-button">delete</span>
  </div>
);
