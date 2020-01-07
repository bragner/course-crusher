import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

class AuthCallback extends Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }
}

export default AuthCallback;
