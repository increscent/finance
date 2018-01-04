import React from 'react';
import CategoryEdit from '../categoryEdit/categoryEdit.js';

export default (props) => (
  <div className="category-add">
    <CategoryEdit {...props}
      isNewCategory={true}
      totalDebits={0} />
  </div>
);
