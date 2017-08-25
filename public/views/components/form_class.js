import React from 'react';
import ReactDOM from 'react-dom';

export class Form {
  constructor(props) {
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  handleFormInput(property, e) {
    this.setState({
      [property]: e.target.value
    });
  }

  validateFormInput(rules) {
    var error_messages = [];
    for (var i = 0; i < rules.length; i++) {
      var result = rules[i].validate(this.state[rules[i].name]);
      if (!result) {
        error_messages.push(rules[i].error_message);
      }
    }

    return error_messages;
  }
}

export function FormValidationMessages(props) {
  return (
    <div className="errorMessages">
      <ul>
        {
          props.validationMessages.map((x, i) => <li key={i}>{x}</li>)
        }
      </ul>
    </div>
  );
}
