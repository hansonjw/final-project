import React, { useState } from 'react';

import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_GET_PERSPECTIVE } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import CommentList from '../components/CommentList';

 
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
        <div>
            <h2>Single Perspective Page</h2>
            {Auth.loggedIn() &&
                <form onSubmit={handleFormSubmit}>
                    <textarea
                        placeholder="new comment..."
                        value={commentText}
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">
                        Add a comment
                    </button>
                </form>}
            <div>
                <p>{perspectiveData.security}</p>
                <p>{perspectiveData._id}</p>
                <p>{perspectiveData.text}</p>
                <p>{perspectiveData.email}</p>
                <p>{perspectiveData.date}</p>
                {/* {commentsAr.map(aComment => (
                    <div>
                        <p>Comment ID: {aComment._id}</p>
                        <p>{aComment.commentText}</p>
                        <p>Comment from: {aComment.email}</p>
                    </div>
                ))} */}
                <CommentList comments={commentsAr}></CommentList>
            </div>
        </div>
    );
};

export default SinglePerspective