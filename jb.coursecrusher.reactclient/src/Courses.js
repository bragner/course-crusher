import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllCourses from './AllCourses.js';
import Course from './Course.js';
import AddCourse from './AddCourseForm.js'


const Courses = () => {
  return <Switch>
            <Route exact path="/courses/add" component={AddCourse}/>
            <Route exact path="/courses" component={AllCourses}/>
            <Route path="/courses/:courseId" component={Course}/>
        </Switch>
}

export default Courses;