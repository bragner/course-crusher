import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AllCourses extends React.Component {
  state = {
    courses: []
  }

  async componentDidMount() {
    var response = await axios.get(`https://localhost:44320/api/courses`)
    const courses = response.data;
    this.setState({ courses });
  }

  render() {
    return (   
      <div>
        <Link to={`/courses/add`}>Add</Link>
        {
          this.state.courses.map(course => (
            <div className="course-item" key={course.courseId}>
              <Link to={`/courses/${course.courseId}`}>{course.name}</Link>
            </div>))
        }
        </div>
    )
  }
}