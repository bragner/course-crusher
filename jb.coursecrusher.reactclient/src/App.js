import React from 'react';
import './App.css';
import Home from './Home.js';
import { Route } from 'react-router-dom'
import Courses from './Courses.js'

const App = () => (
  <div id="container">
    <Route exact path="/" component={Home}/>
    <Route path='/courses' component={Courses}/>
  </div>
)

export default App