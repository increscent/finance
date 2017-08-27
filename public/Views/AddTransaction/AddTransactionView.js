import React from 'react';
import AddTransactionForm from './AddTransactionForm.js';
import BackNav from '../Components/BackNav.js';

export default function AddTransactionView(props) {
  return (
    <div>
      <BackNav title="Log Transaction"/>
      <div className="container">
        <AddTransactionForm />
      </div>
    </div>
  );
}
