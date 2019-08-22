import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home.js'
import Courses from './Courses.js'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/courses' component={Courses}/>
    </Switch>
  </main>
)

export default Main