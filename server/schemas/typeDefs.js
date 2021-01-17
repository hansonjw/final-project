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
        email: String
        security: String
        text: String
        date: Date
        comments: [Comment]
    }

    type Comment {
        commentDate: Date
        commentText: String
        email: String
        _id: ID
    }

    input newComment {
        commentText: String
        author: String
    }

    type Query {
        me: User
        perspectives: [Perspective]
        users: [User]
        perspective(_id: ID!): Perspective
        getSecurity(ticker: String!): [Perspective]
    }

    type Mutation {
        createUser(displayName: String!, email: String!, password: String!): Auth
        addPerspective(security: String!, text: String!): Perspective
        addComment(perspectiveId: ID!, text: String): Perspective
        login(email: String!, password: String!): Auth
    }

    type Auth {
        token: ID!
        user: User
    }
`;


module.exports = typeDefs;