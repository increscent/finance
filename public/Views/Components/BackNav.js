import React from 'react';
import {withRouter} from 'react-router-dom';

function BackNav(props) {
  var handleClick = function (e) {
    e.preventDefault();
    props.history.goBack();
  };

  return (
    <div id="back-nav">
      <span><a href="#" onClick={handleClick}>back</a></span>
    </div>
  );
}

export default withRouter(BackNav);
