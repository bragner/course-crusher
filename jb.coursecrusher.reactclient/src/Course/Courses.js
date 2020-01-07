import React, { Component } from "react";
import "./Course.css";
import { Link } from "react-router-dom";
import AddCourseModal from "../Modals/AddCourseModal.js";
import API from "../api";
import { Spinner } from "react-bootstrap";

class Courses extends Component {
  constructor(props) {
    super(props);

    if (!this.props.auth.isAuthenticated()) return this.props.auth.login();

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
    this.api.get("courses?includeQuestions=true").then(allCourses => {
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
  };

  render() {
    let filteredCourses = this.state.courses.filter(course => {
      return (
        course.name
          .toLowerCase()
          .search(this.state.searchPhrase.toLowerCase()) !== -1
      );
    });
    return (
      <>
        <div style={{ margin: "10px" }}>
          <div className="course-header">
            <div>
              <h2>Courses</h2>
            </div>
            <AddCourseModal
              auth={this.props.auth}
              api={this.api}
              onCourseAdded={this.onCourseAdded.bind()}
            />
          </div>
          <hr />
          {this.state.isLoading && (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" variant="primary" />
            </div>
          )}
          {!this.state.isLoading && (
            <>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 pull-right float-right">
                <input
                  className="form-control float-right"
                  placeholder="Search courses..."
                  type="text"
                  name="filter"
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
                        course: course,
                        auth: this.props.auth
                      }}
                    >
                      <div className="course col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
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
          )}
        </div>
      </>
    );
  }
}

export default Courses;
