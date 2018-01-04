import React from 'react';
import ViewHolder from '../../viewHolder/viewHolder.js';
import CategoryAddContainer from '../../categoryAdd/categoryAddContainer.js';
import CategoryDelete from '../../categoryDelete/categoryDelete.js';
import TransactionAddContainer from '../../transactionAdd/transactionAddContainer.js';

export const CATEGORY_ADD = 'CATEGORY_ADD';
export const CATEGORY_DELETE = 'CATEGORY_DELETE';
export const TRANSACTION_ADD = 'TRANSACTION_ADD';

export default (props) => {
  let title = (props.actionType === CATEGORY_ADD)? 'Add Category' :
    (props.actionType === CATEGORY_DELETE)? 'Delete Category' :
      (props.actionType === TRANSACTION_ADD)? 'Add Transaction' :
        null;

  return (
    <ViewHolder onClose={props.onClose} title={title}>
      {props.actionType === CATEGORY_ADD && <CategoryAddContainer />}
      {props.actionType === CATEGORY_DELETE && <CategoryDelete />}
      {props.actionType === TRANSACTION_ADD && <TransactionAddContainer />}
    </ViewHolder>
  );
};
