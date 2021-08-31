const {gql} = require('apollo-server-express');

//definre tipuri de date si actiuni accesibile clientului
//este un fel de schema de actiuni/date cu care poate lucra clientul din cate am inteles
//Pentru partea de join am construit EmployeeWithProject care contine si campul de tip Project

const typeDefEmployee = gql `

    scalar ISODate
    scalar ISODateTime

    type EmployeeWithProject @key(fields: "id"){
        id: ID!
        name: String!
        project_id: ID!
        adress: String!
        email: String!
        hire_date: ISODate!
        salary: Int!
        job_title: String!
        project: Project
    }

    type Employee @key(fields: "id"){
        id: ID!
        name: String!
        project_id: ID!
        adress: String!
        email: String!
        hire_date: ISODate!
        salary: Int!
        job_title: String!
    }

    extend type Project @key(fields: "id"){
        id: ID! @external
        project_name: String! @external
        project_code: String! @external
        start_date: ISODateTime! @external
        planned_end_date: ISODateTime! @external
        description: String! @external
    }

    extend type Query {
        getEmployees: [Employee]
        getEmployeeAndProject(id: ID!): EmployeeWithProject
        getEmployee(name: String!): Employee
    }

    extend type Mutation {
        addEmployee(name: String!, project_id: ID!, adress: String!, email: String!, hire_date: ISODate!, salary: Int!, job_title: String!): Employee
        updateEmployee(id: ID!, name: String!, project_id: ID!, adress: String!, email: String!, hire_date: ISODate!, salary: Int!, job_title: String!): Employee
        deleteEmployee(id: ID!): Employee
    }
`

module.exports = {typeDefEmployee};