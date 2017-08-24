import React from 'react';
import ReactDOM from 'react-dom';

export default class Form {
  constructor(props) {
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  handleFormInput(property, e) {
    this.setState({
      [property]: e.target.value
    });
  }
}
