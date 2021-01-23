import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost';
import { ChakraProvider, Box } from "@chakra-ui/react"


// import pages and components...as you develop them...
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import SinglePerspective from './pages/SinglePerspective';


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
    <ChakraProvider>  
      <ApolloProvider client={client}>
              <Router>
                <div className="mainpage">
                  <NavBar />

                      <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/signup" component={Signup} />
                          <Route exact path="/singleperspective/:id" component={SinglePerspective} />
                          <Route component={NoMatch} />
                      </Switch>
                    
                  <Footer />
                </div>
              </Router>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;

