import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import AllCourses from "./AllCourses.js";
import Course from "./Course.js";
import AddCourseForm from "./AddCourseForm.js";
import { Modal, Button } from "react-bootstrap";
import API from "./api";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;
    if (this.props.api === undefined) {
      this.api = new API(this.props.auth.getAccessToken());
    }

    this.state = {
      courses: [],
      isLoading: true,
      newCourseOpen: false,
      searchPhrase: ""
    };
  }
  showModal = () => {
    this.setState({
      newCourseOpen: true
    });
  };
  closeModal = () => {
    this.setState({
      newCourseOpen: false
    });
  };

  componentDidMount() {
    this.api.get("courses").then(allCourses => {
      if (allCourses !== undefined) {
        this.setState({ courses: allCourses, isLoading: false });
      }
    });
  }
  onCourseAdded = course => {
    var currentCourses = this.state.courses;
    currentCourses.push(course);
    this.setState({ couses: currentCourses, newCourseOpen: false });
  };
  onSearch = e => {
    this.setState({ searchPhrase: e.target.value });
    console.log(e.target.value);
  };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    let filteredCourses = this.state.courses.filter(course => {
      return (
        course.name
          .toLowerCase()
          .search(this.state.searchPhrase.toLowerCase()) !== -1
      );
    });
    return (
      <>
        <div className="course-header">
          <h2>Courses</h2>
          <Button className="float-right" onClick={this.showModal}>
            Add course (+)
          </Button>
        </div>

        <Modal show={this.state.newCourseOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCourseForm
              auth={this.props.auth}
              api={this.api}
              onCourseAdded={this.onCourseAdded.bind()}
            />
          </Modal.Body>
        </Modal>

        <hr />
        <div className="course-search col-sm-6 col-md-6 col-lg-6 col-xl-6 pull-right float-right">
          <input
            className="form-control float-right"
            placeholder="Search courses..."
            type="text"
            name="filter"
            value={this.state.name}
            onChange={this.onSearch}
          ></input>
        </div>
        <div className="course-list">
          {filteredCourses.map(course => {
            return (
              <Link
                key={course.courseId}
                to={{
                  pathname: `/courses/${course.courseId}`,
                  course: course
                }}
              >
                <div className="course text col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <div
                    className="course-div"
                    style={{
                      backgroundImage: `url(data:image/png;base64,${course.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover"
                    }}
                  >
                    <span>{course.name}</span>
                    <div className="course-description">
                      {course.description}
                    </div>
                    <span className="course-questions-count">
                      No. questions: {course.questions.length}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}

export default Courses;
