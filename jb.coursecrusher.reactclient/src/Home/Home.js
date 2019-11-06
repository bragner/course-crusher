import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 className="jumbotron">Course Crusher</h1>
        {this.props.auth.isAuthenticated() && (
          <Row>
            <Col>
              <Link to="/courses">
                <h3>Courses</h3>
              </Link>
            </Col>
            <Col>
              <Link to="/quiz">
                <h3>Quiz</h3>
              </Link>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default Home;
