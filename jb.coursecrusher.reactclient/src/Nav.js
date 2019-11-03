import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;

    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated() && (
            <li>
              <Link to="/courses">Courses</Link>
            </li>
          )}
          {isAuthenticated() && (
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
          )}
          {isAuthenticated() && (
            <>
              <li className="float-right">
                <img
                  className="profile-thumbnail img-rounded img-responsive"
                  alt="profile pic"
                  src={
                    localStorage.getItem("profile-img")
                      ? localStorage.getItem("profile-img")
                      : "https://medicine.fiu.edu/about/faculty-and-staff/people/_assets/profiles/headshot-placeholder.png"
                  }
                ></img>
              </li>
            </>
          )}
          <li className="float-right">
            <Button
              variant="secondary"
              onClick={isAuthenticated() ? logout : login}
            >
              {isAuthenticated() ? "Log Out" : "Log In"}
            </Button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
