// import gql template function
const { gql } = require('apollo-server-express');

//define typeDefs
const typeDefs = gql`
    
    scalar Date

    type User {
        _id: ID
        displayName: String
        email: String
        perspectives: [Perspective]
    }

    type Perspective {
        _id: ID
        author: String
        security: String
        text: String
        date: Date
        comments: [Comment]
    }

    type Comment {
        date: Date
        commentText: String
        displayName: String
    }

    input newComment {
        commentText: String
        author: String
    }

    input newPerspective {
        text: String
        security: String
    }

    type Query {
        me: User
        perspectives: [Perspective]
        users: [User]
    }

    type Mutation {
        createUser(displayName: String!, email: String!, password: String!): Auth
        addPerspective(input: newPerspective): User
        addComment(input: newComment): Perspective
        login(email: String!, password: String!): Auth
    }

    type Auth {
        token: ID!
        user: User
    }
`;


module.exports = typeDefs;