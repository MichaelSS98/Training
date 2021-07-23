const {gql} = require('apollo-server-express');

const typeDefProject = gql `
    
    scalar ISODateTime

    type Project {
        id: ID!
        project_name: String!
        start_date: ISODateTime!
        planned_end_date: ISODateTime!
        description: String!
        project_code: String!
    }

    type Query {
        getProjects: [Project]
    }

    type Mutation {
        addProject(project_name: String!, start_date: ISODateTime!, planned_end_date: ISODateTime!, description: String!, project_code: String!): Project
        updateProject(id: ID!, project_name: String!, start_date: ISODateTime!, planned_end_date: ISODateTime!, description: String!, project_code: String!): Project
        deleteProject(id: ID!): Project
    }
`

module.exports = {typeDefProject};