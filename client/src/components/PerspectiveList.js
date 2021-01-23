import React from 'react';
import { Link } from "react-router-dom";

import { Input, HStack, Stack, Box, Spacer, Heading, Flex, Center, Text, Button } from '@chakra-ui/react';
import { breakpoints } from '../themes';


const PerspectiveList = ({ perspectiveData }) => {

  if (!perspectiveData.length) {
    return <h3>...</h3>;
  }

  return (
    <div>
      <h1>Get Perspective Component</h1>
      
      <h2>List of current perspectives:</h2>
      {perspectiveData.map(aPerspective => (
        <Spacer>
        <Center>
          <Link to={`/singleperspective/${aPerspective._id}`}>
            <Box p="3" w={[300, 400, 1000]}>
              {/* <HStack w='100%'> */}
              <Flex
                justify="space-between"
                wrap="wrap"
                w="100%"
              >
                <Text fontSize="xs" color='#999999'>Posted by: {aPerspective.email}</Text>
                <Text fontSize="xs" color='#999999'>Date: {aPerspective.date}</Text>
              </Flex>
              {/* </HStack>  */}
              <Box>
                <Text fontSize="md" color='white'>{aPerspective.text}</Text>
              </Box>
              <Flex
                justify="space-between"
                wrap="wrap"
                w="100%"
              >
                <Text fontSize="xs" color='#999999'>Number of comments:  {aPerspective.comments.length}</Text>
              </Flex>
            </Box>
          </Link>
        </Center>
        </Spacer>
        ))}
    </div>
  );
};

export default PerspectiveList


