import React, { Component } from "react";
import "./index.css";
import { Route } from "react-router-dom";
import Home from "./Home/Home.js";
import Nav from "./Nav/Nav";
import Auth from "./Auth/Auth";
import Callback from "./Auth/AuthCallback";
import Courses from "./Course/Courses.js";
import SingleCourse from "./Course/SingleCourse.js";

import API from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
    if (this.auth.isAuthenticated()) {
      this.api = new API(this.auth.getAccessToken());
    }
  }

  render() {
    return (
      <div>
        <Nav auth={this.auth} />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/courses"
          render={() => <Courses auth={this.auth} api={this.api} />}
        />
        <Route
          path="/callback"
          render={props => <Callback auth={this.auth} {...props} />}
        />
        <Route
          path="/courses/:id"
          render={props => <SingleCourse auth={this.auth} {...props} />}
        />
      </div>
    );
  }
}
export default App;
