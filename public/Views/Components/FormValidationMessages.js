import React from 'react';

export default function FormValidationMessages(props) {
  return (
    <div className="errorMessages">
      {
        props.validationMessages.map((x, i) => <div key={i} className="alert alert-warning" role="alert">{x}</div>)
      }
    </div>
  );
};
