import React from 'react';
import AddBudgetForm from './AddBudgetForm.js';
import BackNav from '../Components/BackNav.js';

export default function AddBudgetView(props) {
  return (
    <div>
      <BackNav />
      <AddBudgetForm />
    </div>
  );
}
