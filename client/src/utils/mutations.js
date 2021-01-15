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