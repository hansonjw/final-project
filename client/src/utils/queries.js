import gql from 'graphql-tag';

// developer insight, learning: this is what is put into graph ql playground...
export const QUERY_GET_SECURITY = gql`
    query getSecurity($ticker: String!) {
        getSecurity(ticker: $ticker) {
            email
            security
            text
            date
            _id
            comments {
              _id
              commentText
              email
            }
        }
    } 
`;

export const QUERY_GET_PERSPECTIVE = gql`
    query perspective($_id: ID!){
        # get all users
        perspective(_id: $_id) {
            email
            security
            text
            date
            _id
            comments {
                _id
                commentText
                email
            }
        }
    }
`;

export const QUERY_GET_PERSPECTIVES = gql`
    query {
        perspectives {
            email
            security
            text
            date
            _id
            comments {
                _id
                commentText
                email
            }
        }
    }
`;

export const QUERY_ME = gql`
    query{
        me {
        displayName
        email
        _id
        perspectives {
            date
            security
            text
            _id
            email
        }
        }
    }
`;