import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import pages and components...as you develop them...
import Header from './components/Header';
import Footer from './components/Footer';
import ExampleChart from './pages/SearchSecurity.js'

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
            <Router>
              <div className="flex-column justify-flex-start min-100-vh">
                <Header />
                  <div className="App">This is a test, Justin!</div>
                  {/* render(<ExampleChart />, document.getElementByID("app")); */}
                  <ExampleChart />
                <Footer />
              </div>
            </Router>
    </ApolloProvider>
  );
}

export default App;
