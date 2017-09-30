import React from 'react';
import classnames from 'classnames';

export default function DebitCreditRadioButtons(props) {
  let debitClasses = classnames('btn', 'btn-outline-secondary', {'active': props.transaction_type == 'debit'});
  let creditClasses = classnames('btn', 'btn-outline-secondary', {'active': props.transaction_type == 'credit'});

  return (
    <div className="btn-group" data-toggle="buttons">
      <label className={debitClasses} onClick={() => props.onTransactionTypeChange('debit')}>
        <input type="radio" name="transaction_type" id="debit" autoComplete="off"/> Debit
      </label>
      <label className={creditClasses} onClick={() => props.onTransactionTypeChange('credit')}>
        <input type="radio" name="transaction_type" id="credit" autoComplete="off"/> Credit
      </label>
    </div>
  );
}
