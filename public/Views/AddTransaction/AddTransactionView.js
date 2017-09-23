import React from 'react';
import AddTransactionForm from './AddTransactionForm.js';
import BackNav from '../Components/BackNav.js';
import Helpers from '../../Helpers.js';

export default function AddTransactionView(props) {
  let from = Helpers.decodeURIParam(props.match.params.from);

  return (
    <div>
      <BackNav title="Log Transaction"/>
      <div className="container">
        <AddTransactionForm from={from} />
      </div>
    </div>
  );
}
