import React from 'react';
import { Flex, Center, Box, Spacer } from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer class="footer">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding=".5rem"
        bg="red.900"
        color="white"
      >
        <Center w="500px">fostering wealth and wisdom...</Center>
        {/* <Spacer /> */}
        <Center w="500px">
          ...page built by Justin Hanson
        </Center>
        {/* <Spacer /> */}
        <Center w="500px">
          <a href="https://twitter.com/hansonjw">Twitter</a>
        </Center>
      </Flex>
    </footer>
  );
};

export default Footer;