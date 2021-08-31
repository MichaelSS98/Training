const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server');
const {applyMiddleware} = require('graphql-middleware');
const {resolverProject} = require('./resolvers/resolverProject.js');
const {typeDefProject} = require('./typeDefs/typeDefProject.js');
const { buildFederatedSchema } = require("@apollo/federation");
const {permissions} = require("./permissions.js");

const startServer = async () => {

    const port = 5003;

    //conectare la mongo
    const url = "mongodb://mihai:root@mongodb:27017/employees"
    await mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true});

    //creare server de apollo
    const server = new ApolloServer({
        schema: applyMiddleware(buildFederatedSchema([{typeDefs: typeDefProject, resolvers: resolverProject}]), permissions),
        context: ({req}) => { //definire context cu userul din token decodificat primit din request
            const user = req.headers.user ? JSON.parse(req.headers.user) : null;
            console.log(user);
            return {user};
        }
    });

    //pornire server
    server.listen({ port }).then(({url}) => {
        console.log(`Projects service ready at ${url}!`);
    });
};

startServer();