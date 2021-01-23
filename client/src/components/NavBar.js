import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Box, Spacer, Heading, Flex, Center, Text, Button } from '@chakra-ui/react';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    // <header class="header">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        padding=".5rem"
        // bg="red.900"
        bg="#4d0026"
        color="white"
      >
        <Heading as="h4" size="md" w="200">
          <Link to="/">
            <h1>Otium Capital</h1>
          </Link>
        </Heading>
        <Spacer />
          {Auth.loggedIn() ? (
            <>
              {/* <Center w="200px">
                <Link to="/profile">Me</Link>
              </Center> */}
              <Center w="200px">
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </Center>
            </>
          ) : (
            <>
              <Center w="200px">
                <Link to="/login">Login</Link>
              </Center>
              <Center w="200px">
                <Link to="/signup">Signup</Link>
              </Center>
            </>
          )}
      </Flex>
    // </header>
  );
};

export default Header;