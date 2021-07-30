const {rule, shield} = require("graphql-shield");

//functie de verificare a autentificarii
const isAuthenticated = rule()((parent, args, {user}) => {
    return user !== null;
});

//definire permisiuni pentru fiecare apel de Graph
const permissions = shield({
    Query: {
        getUsingToken: isAuthenticated,
        getEmployees: isAuthenticated,
        getEmployeeAndProject: isAuthenticated,
        getEmployee: isAuthenticated,
        getProjects: isAuthenticated
    },
    Mutation: {
        addProject: isAuthenticated,
        updateProject: isAuthenticated,
        deleteProject: isAuthenticated,
        addEmployee: isAuthenticated,
        updateEmployee: isAuthenticated,
        deleteEmployee: isAuthenticated,
        deleteAccount: isAuthenticated
    }
});

module.exports = {permissions};