import React from 'react';

export default (props) => (
  <div className="category-summary-edit">
    <div className="form-row">
      <div className="form-column-left">
        Balance:
      </div>
      <div className="form-column-right">
        $ <input type="number" className="allowance-edit" defaultValue="150" /> - $30.00 = $120.00
      </div>
    </div>
    <div className="form-row">
      <div className="form-column-left">
        Name:
      </div>
      <div className="form-column-right">
        <input type="text" className="name-edit" defaultValue="Food" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-column-left">
        Allowance:
      </div>
      <div className="form-column-right">
        <input type="radio" name="allowanceType" className="allowance-type-picker" id="dollarType" defaultChecked /><label htmlFor="dollarType">$</label>
        &nbsp;<input type="number" className="allowance-edit" />
        &nbsp;<input type="radio" name="allowanceType" className="allowance-type-picker" id="percentType" /><label htmlFor="percentType">%</label>
      </div>
    </div>
    <div className="form-submit-row">
      <button className="form-button">cancel</button>
      <button className="form-button">save</button>
    </div>
    <span className="link-button delete-button">delete</span>
  </div>
);
