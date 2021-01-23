import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Input, SimpleGrid, Center, Button, Stack, Text, Box } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
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
          <Text fontSize="3xl" color='white'>Login Page</Text>
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <Stack spacing={7}>
                <Box>
                <FormLabel htmlFor="email" color='white'>Email address:</FormLabel>
                <Input
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
                
                <FormLabel htmlFor="pwd" color='white'>Password:</FormLabel>
                <Input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />


                {
                  error ? <div>
                    <p className="error-text" >The provided credentials are incorrect</p>
                  </div> : null
                }
                </Box>
                <Button type="submit" bg='red.400' color='white'>
                  Login
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Stack>
        </Center>

    </div>
  );
}


export default Login;