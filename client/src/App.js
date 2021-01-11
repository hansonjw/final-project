import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import pages...as you develop them...

// Is this for front end authentication??  or does this just store the token in local storage
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">This is a test, Justin!</div>
    </ApolloProvider>
  );
}

export default App;
