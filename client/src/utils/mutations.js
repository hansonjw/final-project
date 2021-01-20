import gql from 'graphql-tag';


export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;


export const CREATE_USER = gql`
    mutation createUser($displayName: String!, $email: String!, $password: String!){
        createUser(displayName: $displayName, email: $email, password: $password){
            token
            user {
                _id
            }
        }
    }
`;


export const ADD_PERSPECTIVE = gql`
    mutation addPerspective($security: String!, $text: String!) {
        addPerspective(security:$security, text: $text){
                _id
                email
                security
                text
                date
                comments {
                    commentText
                }
        }
    }
`;


export const ADD_COMMENT = gql`
    mutation addComment($perspectiveId: ID!, $text: String!) {
        addComment(perspectiveId:$perspectiveId, text: $text){
            _id
            email
            security
            text
            date
            comments {
                commentText
                email
                commentDate
            }
        }
    }
`;




// scratch work...
// addPerspective(security: String!, text: String!): Perspective

// mutation addPerspective($security: String!, $text: String!) {
//     addPerspective(security:$security, text: $text)
//         {
//             _id
//             email
//             security
//             text
//             date
//             comments {
//                 commentText
//         }
//     }
// }