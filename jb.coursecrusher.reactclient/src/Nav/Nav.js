import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";

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
                <Dropdown>
                  <Dropdown.Toggle
                    size="sm"
                    variant="Info"
                    id="dropdown-button"
                  >
                    <img
                      className="profile-thumbnail img-rounded img-responsive"
                      alt="profile pic"
                      src={
                        localStorage.getItem("profile-img")
                          ? localStorage.getItem("profile-img")
                          : "https://medicine.fiu.edu/about/faculty-and-staff/people/_assets/profiles/headshot-placeholder.png"
                      }
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="dropdown-profile-menu">
                    <Dropdown.Item>
                      <div
                        variant="secondary"
                        style={{ marginTop: "-25px", height: "40px" }}
                        onClick={logout}
                      >
                        Log out
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
          <li className="float-right">
            {!isAuthenticated() && (
              <>
                <Button variant="secondary" onClick={login}>
                  Log In
                </Button>
              </>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
