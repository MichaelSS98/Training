import { gql } from 'apollo-angular';

//the queries used to call the graphql back-end

//extract all projects
export const GET_PROJECTS = gql`
    query Query {
        getProjects {
            id
            project_name
            project_code
            start_date
            planned_end_date
            description
        }
    }
`;

//add a new project
export const ADD_PROJECT = gql `
mutation AddProjectMutation($project_name: String!, $start_date: DateTime!,
    $planned_end_date: DateTime!, $description: String!, $project_code: String!) {
    addProject(project_name: $project_name, start_date: $start_date,
    planned_end_date: $planned_end_date, description: $description, project_code: $project_code) {
      id
      project_name
      project_code
      start_date
      planned_end_date
      description
    }
  }
`;

//update an existing projecct
export const UPDATE_PROJECT = gql `
mutation UpdateProjectMutation($id: ID!, $project_name: String!, $start_date: DateTime!,
    $planned_end_date: DateTime!, $description: String!, $project_code: String!) {
    updateProject(id: $id, project_name: $project_name, start_date: $start_date,
    planned_end_date: $planned_end_date, description: $description, project_code: $project_code) {
      id
      project_name
      project_code
      start_date
      planned_end_date
      description
    }
  }
`;

//delete a project
export const DELETE_PROJECT = gql `
mutation DeleteProjectMutation($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;