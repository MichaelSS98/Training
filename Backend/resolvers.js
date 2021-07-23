const { mergeResolvers } = require('@graphql-tools/merge');
const {resolverEmployee} = require('./resolvers/resolverEmployee.js');
const {resolverProject} = require('./resolvers/resolverProject.js');

//combinarea resolverelor din cadrul proiectului nostru

const resolversArray = [
    resolverEmployee,
    resolverProject
];

const resolvers = mergeResolvers(resolversArray);

module.exports = {resolvers}