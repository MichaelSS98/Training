const { mergeTypeDefs } = require('@graphql-tools/merge');
const {typeDefEmployee} = require('./typeDefs/typeDefEmployee.js');
const {typeDefProject} = require('./typeDefs/typeDefProject.js');

//combinare tipuri cu care vom lucra din moment ce avem 2 colectii

const types = [
    typeDefEmployee,
    typeDefProject
];

const typeDefs = mergeTypeDefs(types);

module.exports = {typeDefs};