import React from 'react';

import Auth from '../utils/auth';

import StockQuery from '../components/StockQuery';

 
const Home = () => {

  const loggedIn = Auth.loggedIn();

  return (
    <div class="body">
      <h2>Homepage</h2>
      <div>
        {loggedIn && (
          <div>
            <StockQuery></StockQuery>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home