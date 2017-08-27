import React from 'react';

export default function DebitCreditRadioButtons(props) {
  return (
    <div className="btn-group" data-toggle="buttons">
      <label className="btn btn-outline-secondary active" onClick={() => props.onTransactionTypeChange('debit')}>
        <input type="radio" name="transaction_type" id="debit" autoComplete="off"/> Debit
      </label>
      <label className="btn btn-outline-secondary" onClick={() => props.onTransactionTypeChange('credit')}>
        <input type="radio" name="transaction_type" id="credit" autoComplete="off"/> Credit
      </label>
    </div>
  );
}
