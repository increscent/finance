import React from 'react';

export default function CustomSelectInput(props) {
  return <input type="text" value={props.value} style={{position: "absolute", zIndex: 1}} onChange={props.onChange} autoFocus className="form-control" />;
}
