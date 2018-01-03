import React from 'react';

export default (props) => (
  <div className="transaction-add">
    <div className="form-row">
      <div className="form-column-left">
        Type:
      </div>
      <div className="form-column-right">
        <input type="radio" name="transactionType" className="transaction-type-picker" id="debit" />
        <label htmlFor="debit" className="left-label">debit</label>
        <input type="radio" name="transactionType" className="transaction-type-picker" id="credit" />
        <label htmlFor="credit" className="right-label">credit</label>
      </div>
    </div>
    <div className="form-row">
      <div className="form-column-left">
        Category:
      </div>
      <div className="form-column-right">
        <select>
          <option>Food</option>
          <option>Fun</option>
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-column-left">
        Amount:
      </div>
      <div className="form-column-right">
        $ <input type="number" className="amount-edit" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-column-left">
        Date:
      </div>
      <div className="form-column-right">
        <input type="date" defaultValue="2018-01-02" />
      </div>
    </div>
    <div className="form-row">
      <input type="radio" name="applied" id="unapply" defaultChecked /><label htmlFor="unapply">Save for next period</label>
    </div>
    <div className="form-row">
      <input type="radio" name="applied" id="apply" /><label htmlFor="apply">Apply to current period</label>
    </div>
    <div className="form-submit-row">
      <button className="form-button" onClick={props.onCancel}>cancel</button>
      <button className="form-button" onClick={props.onSave}>save</button>
    </div>
  </div>
);
