import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_GET_PERSPECTIVE } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';

 
const SinglePerspective = () => {

    // get _id from paramter in url
    const { id: perspectiveId } = useParams();
    const [commentText, setText] = useState('');
    const [addComment, { error }] = useMutation(ADD_COMMENT);
    console.log (perspectiveId);

    // get single perspective data based on parameter
    const { loading, data } = useQuery(QUERY_GET_PERSPECTIVE,{
        variables: { _id: perspectiveId }
    })
    const perspectiveData = data?.perspective || [];
    const commentsAr = data?.perspective.comments || [];

    const handleChange = event => {
        setText(event.target.value);
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addComment({
                variables: { perspectiveId: perspectiveId, text: commentText }
            })

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
                {commentsAr.map(aComment => (
                    <div>
                        <p>{aComment._id}</p>
                        <p>{aComment.commentText}</p>
                        <p>{aComment.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SinglePerspective