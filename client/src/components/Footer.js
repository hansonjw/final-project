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
        bg="#1a0a00"
        color="white"
      >
        <Center w="500px" id='footeritem'>fostering wealth and wisdom...</Center>
        {/* <Spacer /> */}
        <Center w="500px" id='footeritem'>
          ...page built by Justin Hanson
        </Center>
        {/* <Spacer /> */}
        <Center w="500px" _hover={{ color: "#e65c00" }}>
          <a href="https://twitter.com/hansonjw" target="_blank">Twitter</a>
        </Center>
      </Flex>
    </footer>
  );
};

export default Footer;