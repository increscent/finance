import React from 'react';
import CategoryEdit from '../categoryEdit/categoryEdit.js';

export default (props) => (
  <div className="category-add">
    <CategoryEdit
      unbudgetedFunds={40}
      currentLimit={undefined}
      totalDebits={30}
      name={undefined}
      onCurrentLimitChange={console.log}
      onNameChange={console.log}
      allowance={undefined}
      onAllowanceChange={console.log}
      allowanceType={undefined}
      onAllowanceTypeChange={console.log}
      onSave={() => console.log('saved')}
      onCancel={() => console.log('cancelled')} />
  </div>
);
