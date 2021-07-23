const {gql} = require('apollo-server-express');

//definre tipuri de date si actiuni accesibile clientului
//este un fel de schema de actiuni/date cu care poate lucra clientul din cate am inteles
//Pentru partea de join am construit EmployeeWithProject care contine si campul de tip Project

const typeDefEmployee = gql `

    scalar ISODate

    type EmployeeWithProject {
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

    type Employee {
        id: ID!
        name: String!
        project_id: ID!
        adress: String!
        email: String!
        hire_date: ISODate!
        salary: Int!
        job_title: String!
    }

    type Query {
        getEmployees: [Employee]
        getEmployeeAndProject(id: ID!): EmployeeWithProject
        getEmployee(name: String!): Employee
    }

    type Mutation {
        addEmployee(name: String!, project_id: ID!, adress: String!, email: String!, hire_date: ISODate!, salary: Int!, job_title: String!): Employee
        updateEmployee(id: ID!, name: String!, project_id: ID!, adress: String!, email: String!, hire_date: ISODate!, salary: Int!, job_title: String!): Employee
        deleteEmployee(id: ID!): Employee
    }
`

module.exports = {typeDefEmployee};