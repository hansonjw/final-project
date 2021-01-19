
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Auth from '../utils/auth';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_SECURITY } from '../utils/queries';
 
const GetPerspectives = (tickerSymbol) => {

  // get perspectives from ticker
  const { loading, data } = useQuery(QUERY_GET_SECURITY, {
      variables: { ticker: tickerSymbol.ticker }
  });
  const perspectiveData = data?.getSecurity || [];
  
  if (!perspectiveData.length) {
    return <h3>...</h3>;
  }

  return (
    <div>
      <h1>Get Perspective Component</h1>
      <Link to={`/addperspective/${tickerSymbol.ticker}`}><h2>{tickerSymbol.ticker} - Add a Perspective</h2></Link>
      <h2>List of current perspectives:</h2>
      {perspectiveData.map(aPerspective => (
        <Link to={`/singleperspective/${aPerspective._id}`}>
          <div>
            <p>{aPerspective.text}</p>
            <h4>{aPerspective.email}</h4>
            <p>{aPerspective.comments}</p>
            <p>{aPerspective.date}</p>
            <p>{aPerspective._id}</p>
          </div>
        </Link>
        ))}
    </div>
  );
};

export default GetPerspectives


