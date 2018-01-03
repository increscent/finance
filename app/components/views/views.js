import React from 'react';
import ViewHolder from '../viewHolder/viewHolder.js';

export default (props) => (
  <span id="views">
    {props.viewStack.map((view, i) => (
      <ViewHolder title={view.title} key={i}>
        {view.component}
      </ViewHolder>
    ))}
  </span>
);
