import React from 'react';
import { Flex, Box, Spacer } from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer class="footer">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg="red.900"
        color="white"
      >
        <Box w="500px">fostering wealth and wisdom...</Box>
        <Spacer />
        <Box w="500px">
          ...page built by Justin Hanson
        </Box>
        <Spacer />
        <Box w="500px">
          <a href="https://twitter.com/hansonjw">Twitter</a>
        </Box>
      </Flex>
    </footer>
  );
};

export default Footer;