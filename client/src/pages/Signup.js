import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { CREATE_USER } from "../utils/mutations";
import { Input, Center, Button, Stack, Text, Box } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [createUser] = useMutation(CREATE_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await createUser({
      variables: {
        email: formState.email, password: formState.password, displayName: formState.displayName
      }
    });
    const token = mutationResponse.data.createUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div class="body">
      <Center>
        <Stack spacing={5}>
          <Center>
            <Text fontSize="3xl" color='white'>Sign Up Page</Text>
          </Center>
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <Stack spacing={5}>
                <Box Box w={[200, 400]}>

                  <Box py='3'>
                    <FormLabel htmlFor="displayName" color='white'>Display Name:</FormLabel>
                    <Input
                      placeholder="Display Name"
                      name="displayName"
                      type="displayName"
                      id="displayName"
                      bg='white'
                      borderColor="#e65c00"
                      onChange={handleChange}
                    />
                  </Box>

                  <Box py='3'>
                    <FormLabel htmlFor="email" color='white'>Email:</FormLabel>
                    <Input
                      placeholder="youremail@test.com"
                      name="email"
                      type="email"
                      id="email"
                      bg='white'
                      borderColor="#e65c00"
                      onChange={handleChange}
                    />
                  </Box>

                  <Box py='3'>
                    <FormLabel htmlFor="pwd" color='white'>Password:</FormLabel>
                    <Input
                      placeholder="******"
                      name="password"
                      type="password"
                      id="pwd"
                      bg='white'
                      borderColor="#e65c00"
                      onChange={handleChange}
                    />
                  </Box>
                
                </Box>
              
                <Button type="submit" bg="#e65c00" color='white'>
                    Sign Up
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Stack>
      </Center>
    </div>
  );

}

export default Signup;