import React from 'react';
import {withRouter} from 'react-router-dom';

function BackNav(props) {
  var handleClick = function (e) {
    e.preventDefault();
    props.history.goBack();
  };

  return (
    <div id="back-nav" className="container">
      <div className="row">
        <div className="col-1">
          <a href="#" onClick={handleClick}><span className="oi oi-arrow-circle-left"></span></a>
        </div>
        <div className="col-10 mr-auto text-center">
          {props.title}
        </div>
      </div>
    </div>
  );
}

export default withRouter(BackNav);
