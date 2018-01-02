import React from 'react';

export default (props) => (
  <div className="view-container">
    { (props.showHeader || props.title) &&
    <div className="view-header" >
      <div className="view-title">
        { props.title }
      </div>
      <div className="view-close-button">
        X
      </div>
    </div>
    }

    { props.children }
  </div>
);
