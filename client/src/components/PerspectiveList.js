import React from 'react';
import { Link } from "react-router-dom";

 
const PerspectiveList = ({ perspectiveData }) => {

  if (!perspectiveData.length) {
    return <h3>...</h3>;
  }

  return (
    <div>
      <h1>Get Perspective Component</h1>
      
      <h2>List of current perspectives:</h2>
      {perspectiveData.map(aPerspective => (
        <Link to={`/singleperspective/${aPerspective._id}`}>
          <div>
            <p>{aPerspective.text}</p>
            <h4>Posted by: {aPerspective.email}</h4>
            <p>Number of comments: {aPerspective.comments.length}</p>
            <p>Date: {aPerspective.date}</p>
            <p>ID: {aPerspective._id}</p>
          </div>
        </Link>
        ))}
    </div>
  );
};

export default PerspectiveList


