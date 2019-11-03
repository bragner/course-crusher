import React, { Component } from "react";
import "./index.css";
import Home from "./Home.js";
import { Route } from "react-router-dom";
import Courses from "./Courses.js";
import SingleCourse from "./SingleCourse.js";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Auth/AuthCallback";
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
      <>
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
      </>
    );
  }
}
export default App;
