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

          <Center w="300px" id='footeritem'>
            ...site built by Justin Hanson
          </Center>
          <Spacer/>
          <Center w="300px" _hover={{ color: "#e65c00" }}>
            <a href="https://en.wikipedia.org/wiki/Otium" target="_blank">wealth and progress...</a>
          </Center>
          <Spacer/>
          <Center w="300px" id='footeritem' _hover={{ color: "#e65c00" }}>
            <a href="https://twitter.com/hansonjw" target="_blank">Twitter</a>
          </Center>

      </Flex>
    </footer>
  );
};

export default Footer;