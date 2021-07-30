const { mergeTypeDefs } = require('@graphql-tools/merge');
const {typeDefEmployee} = require('./typeDefs/typeDefEmployee.js');
const {typeDefProject} = require('./typeDefs/typeDefProject.js');
const {typeDefUser} = require('./typeDefs/typeDefUser.js');

//combinare tipuri cu care vom lucra din moment ce avem 2 colectii

const types = [
    typeDefEmployee,
    typeDefProject,
    typeDefUser
];

const typeDefs = mergeTypeDefs(types);

module.exports = {typeDefs};