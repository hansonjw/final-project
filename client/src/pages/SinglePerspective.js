import React, { useState } from 'react';

import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_GET_PERSPECTIVE } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import CommentList from '../components/CommentList';

import { Textarea, Divider, Input, VStack, Stack, Box, Spacer, Heading, Flex, Center, Text, Button } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react"

 
const SinglePerspective = () => {

    // get _id from paramter in url
    const { id: perspectiveId } = useParams();
    const [commentText, setText] = useState('');
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    // get single perspective data based on parameter
    const { loading, data } = useQuery(QUERY_GET_PERSPECTIVE,{
        variables: { _id: perspectiveId }
    })

    const perspectiveData = data?.perspective || [];
    const commentsAr = data?.perspective.comments || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleChange = event => {
        setText(event.target.value);
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addComment({
                variables: { perspectiveId: perspectiveId, text: commentText }
            })
            setText('');
        } catch(e) {
            console.error(e);
        }
    }


    return (
        <div class="body">
            {Auth.loggedIn() && 
            <Center>
                <Box p="3" w={[300, 400, 1000]}>
                    <Box>
                        <Center>
                            <Text color="white" fontSize={['xl', '4xl', '6xl']}>{perspectiveData.security}</Text>
                        </Center>
                        <Box p="3">
                            <Text fontSize="sm" color='#999999'>Perspective written by: {perspectiveData.email}</Text>
                            <Text fontSize="sm" color='#999999'>Date: {perspectiveData.date}</Text>
                            <Text Text fontSize="md" color='white' py="3">{perspectiveData.text}</Text>
                        </Box>
                    </Box>
                    <form onSubmit={handleFormSubmit}>
                        <FormControl>
                            <Textarea
                                placeholder="new comment..."
                                bg="White"
                                borderWidth="1px"
                                borderColor="red.400"
                                borderRadius="lg"
                                h={[50, 100]}
                                value={commentText}
                                onChange={handleChange}
                            ></Textarea>
                            <Center>
                                <Button type="submit" bg="#e65c00" color='white' my="3">
                                    Add a comment
                                </Button>
                            </Center>
                        </FormControl>
                    </form>
                    <CommentList comments={commentsAr}></CommentList>
                </Box>
            </Center>
            }
        </div>
    );
};

export default SinglePerspective