import React from 'react';
import ViewHolder from '../../viewHolder/viewHolder.js';
import CategorySummary from '../../categorySummary/categorySummary.js';
import DebitList from '../../debitList/debitList.js';

export default (props) => (
  <ViewHolder onClose={props.onClose} title={'ChangeMe'}>
    <CategorySummary />
    <DebitList />
  </ViewHolder>
);
