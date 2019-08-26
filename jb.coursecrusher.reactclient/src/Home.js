import React from 'react'
import { Link } from 'react-router-dom'

const Home = () =>  (
    <div>
        <h1>
            Course Crusher
        </h1>
        <Link to="/courses">Go to courses</Link>
    </div>
);

export default Home;