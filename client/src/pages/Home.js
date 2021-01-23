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
              <Center>
                <Text  fontSize="3xl" color='white'>Welcome to Otium Capital</Text>
              </Center>
              <Center>
                <Text fontSize="m" color='white'>Please login or signup to begin</Text>
              </Center>
          </Stack>
        </Center>
        )}
      </div>
    </div>
  );
};

export default Home