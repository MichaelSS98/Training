const {gql} = require('apollo-server-express');

const typeDefs = gql `

    type Employee {
        id: ID!
        name: String!
        adress: String!
        email: String!
        salary: Int!
        job_title: String!
    }

    type Query {
        getEmployees: [Employee]
        getEmployee(name: String!): Employee
    }

    type Mutation {
        addEmployee(name: String!, adress: String!, email: String!, salary: Int!, job_title: String!): Employee
        updateEmployee(id: ID!, name: String!, adress: String!, email: String!, salary: Int!, job_title: String!): Employee
        deleteEmployee(id: ID!): Employee
    }
`

module.exports = {typeDefs};