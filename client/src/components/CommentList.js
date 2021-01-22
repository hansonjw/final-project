import React from 'react'


const CommentList = ({ comments }) => {

    if (!comments.length) {
        return <h3>...</h3>;
      }
    
    return (
        <div>
            {comments.map(aComment => (
                <div>
                    <p>Comment ID: {aComment._id}</p>
                    <p>{aComment.commentText}</p>
                    <p>Comment from: {aComment.email}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList