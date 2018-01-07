import React from 'react';

export default (props) => (
  <div className="transaction-add">
    <div className="form-row">
      <div className="form-column-left">
        Type:
      </div>
      <div className="form-column-right">
        <input type="radio" name="transactionType" className="transaction-type-picker" id="debit"
          checked={props.transaction.type === 'DEBIT'} onChange={event => props.onTypeChange('DEBIT')} />
        <label htmlFor="debit" className="left-label">debit</label>
        <input type="radio" name="transactionType" className="transaction-type-picker" id="credit"
          checked={props.transaction.type === 'CREDIT'} onChange={event => props.onTypeChange('CREDIT')} />
        <label htmlFor="credit" className="right-label">credit</label>
      </div>
    </div>

    {props.transaction.type === 'DEBIT' && <div className="form-row">
      <div className="form-column-left">
        Category:
      </div>
      <div className="form-column-right">
        <select value={props.transaction.categoryId} onChange={event => props.onCategoryChange(event.target.value)}>
          {
            props.categories.map(category =>
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            )
          }
        </select>
      </div>
    </div>}

    <div className="form-row">
      <div className="form-column-left">
        Amount:
      </div>
      <div className="form-column-right">
        $ <input type="number" step=".01" className="amount-edit"
          value={props.transaction.amount} onChange={event => props.onAmountChange(event.target.value)} />
      </div>
    </div>

    <div className="form-row">
      <div className="form-column-left">
        Note:
      </div>
      <div className="form-column-right">
        <input type="text" className="note-edit" placeholder="(optional)"
          value={props.transaction.note} onChange={event => props.onNoteChange(event.target.value)} />
      </div>
    </div>

    <div className="form-row">
      <div className="form-column-left">
        Date:
      </div>
      <div className="form-column-right">
        <input type="date" value={props.transaction.date} onChange={event => props.onDateChange(event.target.value)} />
      </div>
    </div>

    {props.transaction.type === 'CREDIT' && <div className="form-row">
      <input type="radio" name="applied" id="unapply" checked={!props.transaction.applied}
        onChange={event => props.onAppliedChange(false)} />
      <label htmlFor="unapply">Save for next period</label>
    </div>}
    {props.transaction.type === 'CREDIT' && <div className="form-row">
      <input type="radio" name="applied" id="apply" checked={props.transaction.applied}
        onChange={event => props.onAppliedChange(true)} />
      <label htmlFor="apply">Apply to current period</label>
    </div>}

    <div className="form-submit-row">
      <button className="form-button" onClick={props.onCancel}>cancel</button>
      <button className="form-button" onClick={() => props.onSave(props.transaction)}>save</button>
    </div>
  </div>
);
