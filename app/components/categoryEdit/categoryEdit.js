import React from 'react';

export default (props) => (
  <div className="category-edit">
    <div className="form-row">
      Unbudgeted funds: ${props.unbudgetedFunds}
    </div>

    {!props.isNewCategory && <div className="form-row">
      <div className="form-column-left">
        Balance:
      </div>
      <div className="form-column-right">
        $ <input type="number" className="allowance-edit" value={props.category.currentLimit}
          onChange={event => props.onCurrentLimitChange(event.target.value)} /> - ${props.totalDebits} = ${props.category.currentLimit - props.totalDebits}
      </div>
    </div>}

    <div className="form-row">
      <div className="form-column-left">
        Name:
      </div>
      <div className="form-column-right">
        <input type="text" className="name-edit" value={props.category.name} onChange={event => props.onNameChange(event.target.value)} />
      </div>
    </div>

    <div className="form-row">
      <div className="form-column-left">
        Allowance:
      </div>
      <div className="form-column-right">
        <input type="radio" name="allowanceType" className="allowance-type-picker" id="dollarType" value="$"
          checked={props.category.allowanceType === '$'} onChange={event => props.onAllowanceTypeChange(event.target.value)} /><label htmlFor="dollarType">$</label>
        &nbsp;<input type="number" step=".01" className="allowance-edit" value={props.category.allowance} onChange={event => props.onAllowanceChange(event.target.value)} />
        &nbsp;<input type="radio" name="allowanceType" className="allowance-type-picker" id="percentType" value="%"
          checked={props.category.allowanceType === '%'} onChange={event => props.onAllowanceTypeChange(event.target.value)} /><label htmlFor="percentType">%</label>
      </div>
    </div>

    <div className="form-submit-row">
      <button className="form-button" onClick={props.onCancel}>cancel</button>
      <button className="form-button" onClick={() => props.onSave(props.category)}>save</button>
    </div>
  </div>
);
