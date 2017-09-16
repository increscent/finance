import React from 'react';

export default function LoginView(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 ml-auto mr-auto text-center">
          <a role="button" className="btn btn-outline-primary login-button" href="/auth/google">
            <i className="fa fa-google"></i> Login with Google
          </a>
        </div>
      </div>
    </div>
  );
}
