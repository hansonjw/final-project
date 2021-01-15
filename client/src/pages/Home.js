import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Auth from '../utils/auth';

 
const Home = () => {
  return (
    <div>
      <div>Homepage</div>
      <div> 
        <Link to="/stockchart">See a chart!</Link>
      </div>
    </div>
  );
};

export default Home
 
