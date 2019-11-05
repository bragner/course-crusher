import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <h1 className="jumbotron" style={{ textAlign: "center" }}>
      Course Crusher
    </h1>
    <Row style={{ textAlign: "center" }}>
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
  </div>
);

export default Home;
