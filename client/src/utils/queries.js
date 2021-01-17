import gql from 'graphql-tag';

// developers insight, learning: this is what is put into graph ql playground...
export const QUERY_GET_SECURITY = gql`
    query getSecurity($ticker: String!) {
        getSecurity(ticker: $ticker) {
            email
            security
            text
            _id
            comments {
              _id
              commentText
              email
            }
        }
    } 
`;


// getSecurity(ticker : $ticker) {
//     email
//     security
//     text
//     _id
//     comments {
//       _id
//       commentText
//       email
//     }
//   }


// export const QUERY_THOUGHTS = gql`
//   query thoughts($username: String) {
//     thoughts(username: $username) {
//       _id
//       thoughtText
//       createdAt
//       username
//       reactionCount
//       reactions {
//         _id
//         createdAt
//         username
//         reactionBody
//       }
//     }
//   }
// `;
