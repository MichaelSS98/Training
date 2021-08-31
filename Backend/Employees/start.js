const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server');
const {applyMiddleware} = require('graphql-middleware');
const {resolverEmployee} = require('./resolvers/resolverEmployee.js');
const {typeDefEmployee} = require('./typeDefs/typeDefEmployee.js');
const { buildFederatedSchema } = require("@apollo/federation");
const {permissions} = require("./permissions.js");

const startServer = async () => {

    const port = 5002;

    //conectare la mongo
    const url = "mongodb://mihai:root@localhost:27017/employees"
    await mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false,
        useCreateIndex: true});

    //creare server de apollo
    const server = new ApolloServer({
        schema: applyMiddleware(buildFederatedSchema([{typeDefs: typeDefEmployee, resolvers: resolverEmployee}]), permissions),
        context: ({req}) => { //definire context cu userul din token decodificat primit din request
            const user = req.headers.user ? JSON.parse(req.headers.user) : null;
            return {user};
        }
    });

    //pornire server
    server.listen({ port }).then(({url}) => {
        console.log(`Employees service ready at ${url}!`);
    });
};

startServer();