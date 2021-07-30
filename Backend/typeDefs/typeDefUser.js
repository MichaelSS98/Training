const {gql} = require('apollo-server-express');

const typeDefUser = gql `

    type User @key(fields: "_id"){
        _id: ID!
        username: String!
        email: String!
        password: String!
        role: String!
    }

    extend type Query {
        getUsingToken: User
    }

    extend type Mutation {
        login(username: String!, password: String!): String
        register(username: String!, email: String!, password: String!): String
        deleteAccount: String
    }
`

module.exports = {typeDefUser};