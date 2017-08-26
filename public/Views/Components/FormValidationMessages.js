import React from 'react';

export default function FormValidationMessages(props) {
  return (
    <div className="errorMessages">
      <ul>
        {
          props.validationMessages.map((x, i) => <li key={i}>{x}</li>)
        }
      </ul>
    </div>
  );
};
