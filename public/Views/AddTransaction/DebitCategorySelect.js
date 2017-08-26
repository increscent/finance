import React from 'react';

export default function DebitCategorySelect(props) {
  return (
    <span>
      <select value={props.category} style={{width: "120px"}} onChange={props.onChange}>
        {
          props.categories.map(x => {
            return <option key={x.id} value={x.id}>{x.category}</option>
          })
        }
      </select>
    </span>
  );
}
