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
    <div class="header">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        padding=".5rem"
        // bg="red.900"
        bg="#1a0a00"
        color="white"
      >
        <Box mx={["0rem","0rem","2rem"]} _hover={{ color: "#e65c00" }}>
          <Link to="/">
            <Text>Otium Capital</Text>
          </Link>
        </Box>
        <Spacer />
          {Auth.loggedIn() ? (
            <>
              {/* <Center w="200px">
                <Link to="/profile">Me</Link>
              </Center> */}
              <Center w="200px" _hover={{ color: "#e65c00" }}>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </Center>
            </>
          ) : (
            <>
              {/* <Box w={[sm, md]}> */}
              <Box mx={["1rem","1rem","7rem"]}>
                <Center _hover={{ color: "#e65c00" }}>
                  <Link to="/login">Login</Link>
                </Center>
              </Box>
              <Box mx={["1rem","1rem","7rem"]}>
                <Center  _hover={{ color: "#e65c00" }}>
                  <Link to="/signup">Sign Up</Link>
                </Center>
              </Box>
            </>
          )}
      </Flex>
    </div>
    // </header>
  );
};

export default Header;