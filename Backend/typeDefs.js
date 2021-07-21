const {gql} = require('apollo-server-express');

//definre tipuri de date si actiuni accesibile clientului
//este un fel de schema de actiuni/date cu care poate lucra clientul din cate am inteles

const typeDefs = gql `

    scalar ISODate

    type Employee {
        id: ID!
        name: String!
        adress: String!
        email: String!
        hire_date: ISODate!
        salary: Int!
        job_title: String!
    }

    type Query {
        getEmployees: [Employee]
        getEmployee(name: String!): Employee
    }

    type Mutation {
        addEmployee(name: String!, adress: String!, email: String!, hire_date: ISODate!, salary: Int!, job_title: String!): Employee
        updateEmployee(id: ID!, name: String!, adress: String!, email: String!, hire_date: ISODate!, salary: Int!, job_title: String!): Employee
        deleteEmployee(id: ID!): Employee
    }
`

module.exports = {typeDefs};