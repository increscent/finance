import React from 'react';

const Budgets = (props) => {
  return (
    <span>
    {props.todos.map((x) => (<div key={x.name}>{x.name}</div>))}
    </span>
  );
};

export default Budgets;
