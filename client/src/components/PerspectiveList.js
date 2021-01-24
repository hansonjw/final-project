import React from 'react';
import { Link } from "react-router-dom";

import { Divider, VStack, Box, Spacer, Heading, Flex, Center, Text, Button } from '@chakra-ui/react';
import { breakpoints } from '../themes';


const PerspectiveList = ({ perspectiveData }) => {

  if (!perspectiveData.length) {
    return <h3>...</h3>;
  }

  return (
    <div>
      <Spacer/>
      <Center>
        <Text fontSize="md" color='#999999'>Current perspectives:</Text>
      </Center>
            
            

      
      <Spacer/>
      {perspectiveData.map(aPerspective => (
        <Spacer>
        
        <Center>
          
          <Link to={`/singleperspective/${aPerspective._id}`}>
            <Box w={[300, 400, 1000]} borderWidth="1px" borderColor="grey" borderRadius="lg" my="3">
              {/* <HStack w='100%'> */}
              <Flex
                justify="space-between"
                wrap="wrap"
                w="100%"
                p='1'
              >
                <Text fontSize="xs" color='#999999'>Posted by: {aPerspective.email}</Text>
                <Text fontSize="xs" color='#999999'>Date: {aPerspective.date}</Text>
              </Flex>
              {/* </HStack>  */}
              <Box p='1'>
                <Text fontSize="md" color='white'>{aPerspective.text}</Text>
              </Box>
              <Flex
                justify="space-between"
                wrap="wrap"
                w="100%"
                p='1'
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


