import React from 'react';
import CustomSelectInput from './CustomSelectInput.js';

export default function CreditCategorySelect(props) {
  return (
    <span>
      {
        Boolean(props.categories.find((x) => x.id == props.category)) ||
        <CustomSelectInput value={props.category} onChange={props.onChange} />
      }

      <select value={props.category} style={{width: "120px"}} onChange={props.onChange}>
        <option value="">New Category</option>
        {
          props.categories.map(x => {
            return <option key={x.id} value={x.id}>{x.category}</option>
          })
        }
      </select>
    </span>
  );
}
