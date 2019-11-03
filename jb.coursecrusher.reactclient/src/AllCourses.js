import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteBtn from "./img/delete.png";

export default class AllCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      isLoading: true
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    fetch("https://localhost:44320/api/courses", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network error, not ok");
      })
      .then(response => {
        this.setState({ courses: response, isLoading: false });
      })
      .catch(error => this.setState({ message: error.message }));
  }

  async onDeleteClick(event) {
    event.preventDefault();
    try {
      const targetId = event.target.id;
      await axios.delete(`https://localhost:44320/api/courses/${targetId}`);

      this.setState(state => {
        const courses = this.state.courses.filter(function(course, index, arr) {
          return course.courseId !== targetId;
        });
        return { courses, value: "" };
      });
    } catch (err) {
      console.log(err);
    }
  }
  onCourseAdded = event => {
    const newCourses = this.state.courses;
    newCourses.push(event);
    this.setState({ courses: newCourses });
  };

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.state.courses.map(course => (
          <div className="list-item flex-container" key={course.courseId}>
            <Link
              style={{ flexGrow: "8" }}
              to={{
                pathname: `/courses/${course.courseId}`,
                state: { name: course.name }
              }}
            >
              {course.name}
            </Link>
            <img
              src={deleteBtn}
              width="5%"
              alt="delete button"
              onClick={e => {
                if (
                  window.confirm("Are you sure you wish to delete this course?")
                )
                  this.onDeleteClick(e);
              }}
              id={course.courseId}
            />
          </div>
        ))}
      </div>
    );
  }
}
