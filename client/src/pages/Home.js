import React from 'react';
import { Spacer, SimpleGrid, Center, Button, Stack, Text, Box } from '@chakra-ui/react';

import Auth from '../utils/auth';

import StockQuery from '../components/StockQuery';

 
const Home = () => {

  const loggedIn = Auth.loggedIn();

  return (
    <div class="body">

      <div>
        {loggedIn ? (
          <div>
            <StockQuery></StockQuery>
          </div>
        ):(
          <Center>
          <Stack spacing={10}>
              <Spacer />
              <Box py="5rem">
                <Center>
                  <Text  fontSize="5xl" color='white'>Otium Capital</Text>
                </Center>
              </Box>
              <Center>
                <Text fontSize="m" color='white'>Welcome! Please login or sign up to begin</Text>
              </Center>
          </Stack>
        </Center>
        )}
      </div>
    </div>
  );
};

export default Home