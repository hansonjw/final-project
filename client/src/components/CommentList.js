import React from 'react';

import { Divider, VStack, Box, Center, Text } from '@chakra-ui/react';


const CommentList = ({ comments }) => {

    if (!comments.length) {
        return <div></div>;
    }
    
    return (
        <div>
            <Center>
                <Box p="3" w={[300, 400, 1000]}>
                    {comments.map(aComment => (
                        <VStack>
                            <Box p="3" w={[300, 400, 1000]} borderWidth="1px" borderColor="grey" borderRadius="lg" my="3">
                                <Text fontSize="md" color='white'>{aComment.commentText}</Text>
                                <Text fontSize="xs" color='#999999'>Comment posted by: {aComment.email}</Text>
                            </Box>
                        </VStack>
                    ))}   
                </Box>
            </Center>
        </div>
    );
};

export default CommentList
