import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_PERSPECTIVE } from '../utils/mutations';
import { QUERY_GET_PERSPECTIVES, QUERY_ME } from '../utils/queries';

import { Textarea, Divider, Input, HStack, Stack, Box, Spacer, Heading, Flex, Center, Text, Button } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react"

// import GetPerspectives from './GetPerspectives.js';

const AddPerspective = (tickerSymbol) => {

  // const { ticker } = useParams();

  // can't quite get this cache thing to work...
  // could do something using links instead of buttons...
  const [perspectiveText, setText] = useState('');
  const [addPerspective, { error }] = useMutation(ADD_PERSPECTIVE, {
    update(cache, { data: { addPerspective } }) {
      try {
        const { perspectives } = cache.readQuery({ query: QUERY_GET_PERSPECTIVES });
        cache.writeQuery({
          query: QUERY_GET_PERSPECTIVES,
          data: { perspectives: [addPerspective, ...perspectives] }
        });
      } catch (e) {
        console.error(e);
      }

      console.log(cache);

      const { perspectives } = cache.readQuery({ query: QUERY_GET_PERSPECTIVES });
      cache.writeQuery({
        query: QUERY_GET_PERSPECTIVES,
          data: { perspectives: [addPerspective, ...perspectives] }
      });
    }
  });


  const handleChange = event => {
    setText(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log('button was pushed');
    console.log(tickerSymbol.ticker);
    console.log(perspectiveText);
    try {
      await addPerspective({
        variables: { text: perspectiveText, security: tickerSymbol.ticker }
      });
    } catch(e) {
      console.error(e);
    }
    // clear form value
    setText('');
  }

  if (!tickerSymbol.ticker){
    return <h3>...</h3>
  }

  return (
    <div>
      <Center><Text color="white" fontSize={['xl', '4xl', '6xl']}>{tickerSymbol.ticker}</Text></Center>
        <Center>
          <Box p="3" w={[300, 400, 1000]}>
            <form onSubmit={handleFormSubmit}>
              <FormControl>
                <Textarea
                  placeholder="Add a new perspective..."
                  bg="White"
                  borderWidth="1px"
                  borderColor="red.400"
                  borderRadius="lg"
                  h={[100, 300]}
                  value={perspectiveText}
                  onChange={handleChange}
                ></Textarea>
                <Spacer/>
                <Center>
                  <Button type="submit" bg="#e65c00" color='white' my="3">Submit New Perspective</Button>
                </Center>
              </FormControl>
            </form>
          </Box>
        </Center>
    </div>
  );
};

export default AddPerspective