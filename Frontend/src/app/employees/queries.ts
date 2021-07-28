import { gql } from 'apollo-angular';

//the queries used to call the graphql back-end

//extract all employees
export const GET_EMPLOYEES = gql`
  query Query {
    getEmployees {
      id,
      name,
      adress,
      email,
      hire_date,
      salary,
      project_id,
      job_title
    }
  }
`;

//delete an employee
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployeeMutation($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

//add a new employee
export const ADD_EMPLOYEE = gql`
mutation AddEmployeeMutation($name: String!, $project_id: ID!, $adress: String!,
    $email: String!, $hire_date: Date!, $salary: Int!, $job_title: String!) {
    addEmployee(name: $name, project_id: $project_id, adress: $adress,
        email: $email, hire_date: $hire_date, salary: $salary, job_title: $job_title) {
      id,
      project_id,
      name,
      salary,
      adress,
      hire_date,
      email,
      job_title
    }
  }
`;

//update an existing employee
export const UPDATE_EMPLOYEE = gql`
mutation UpdateEmployeeMutation($id: ID!, $name: String!, $project_id: ID!, $adress: String!,
    $email: String!, $hire_date: Date!, $salary: Int!, $job_title: String!) {
    updateEmployee(id: $id, name: $name, project_id: $project_id, adress: $adress,
        email: $email, hire_date: $hire_date, salary: $salary, job_title: $job_title) {
      id,
      project_id,
      name,
      salary,
      adress,
      email,
      job_title,
      hire_date
    }
  }
`;