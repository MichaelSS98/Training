const {rule, shield} = require("graphql-shield");

//functie de verificare a autentificarii
const isAuthenticated = rule()((parent, args, {user}) => {
    return user !== null;
});

//definire permisiuni pentru fiecare apel de Graph
const permissions = shield({
    Query: {
        getProjects: isAuthenticated
    },
    Mutation: {
        addProject: isAuthenticated,
        updateProject: isAuthenticated,
        deleteProject: isAuthenticated
    }
});

module.exports = {permissions};