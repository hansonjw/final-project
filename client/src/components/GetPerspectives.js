
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Auth from '../utils/auth';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_SECURITY } from '../utils/queries';
 
const GetPerspectives = (tickerSymbol) => {

  // get perspectives from ticker
  console.log("we are in the GetPerspectives component...")
  console.log(tickerSymbol.ticker);
  const { loading, data } = useQuery(QUERY_GET_SECURITY, {
      variables: { ticker: tickerSymbol.ticker }
  });
  console.log(data);
  const perspectiveData = data?.getSecurity || [];
  console.log(perspectiveData);
  if (!perspectiveData.length) {
    return <h3>...</h3>;
  }

  return (
    <div>
      <h1>NewPage</h1>
      <h2>{tickerSymbol.ticker}</h2>
      {perspectiveData.map(aPerspective => (
        <div>
          <p>{aPerspective.text}</p>
          <h4>{aPerspective.email}</h4>
          <p>{aPerspective.comments}</p>
        </div>
        ))}
    </div>
  );
};

export default GetPerspectives


