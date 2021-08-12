const {gql} = require('apollo-server-express');

const typeDefUser = gql `

    type User @key(fields: "_id"){
        _id: ID!
        username: String!
        email: String!
        password: String!
        role: String!
    }

    type Tokens {
        accessToken: String!
        refreshToken: String!
    }

    extend type Query {
        getUsingToken: User
    }

    extend type Mutation {
        login(username: String!, password: String!): Tokens
        register(username: String!, email: String!, password: String!): String
        refreshToken(token: String!): Tokens
        deleteAccount: String
    }
`

module.exports = {typeDefUser};