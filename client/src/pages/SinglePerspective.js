import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_PERSPECTIVE } from '../utils/queries';

 
const SinglePerspective = () => {

    // get _id from paramter in url
    const { id: perspectiveId } = useParams();
    const [] = useState('');
    console.log (perspectiveId);

    // get single perspective data based on parameter
    const { loading, data } = useQuery(QUERY_GET_PERSPECTIVE,{
        variables: { _id: perspectiveId }
    })
    const perspectiveData = data?.perspective || [];
    const commentsAr = data?.perspective.comments || [];

    return (
        <div>
            <h2>Single Perspective Page</h2>
            <input></input>
            <button>Add a comment</button>
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