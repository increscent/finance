import React from 'react';
import ViewHolder from '../../viewHolder/viewHolder.js';
import CategorySummaryContainer from '../../categorySummary/categorySummaryContainer.js';
import DebitListContainer from '../../debitList/debitListContainer.js';
import CreditListContainer from '../../creditList/creditListContainer.js';

export default (props) => (
  <ViewHolder onClose={props.onClose} title={props.title}>
    {!props.isOtherTransactions && <CategorySummaryContainer />}
    <DebitListContainer isOtherTransactions={props.isOtherTransactions} categoryId={props.categoryId} />
    {props.isOtherTransactions && <CreditListContainer />}
  </ViewHolder>
);
