const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server');
const {applyMiddleware} = require('graphql-middleware');
const {resolverUser} = require('./resolvers/resolverUser.js');
const {typeDefUser} = require('./typeDefs/typeDefUser.js');
const { buildFederatedSchema } = require("@apollo/federation");
const {permissions} = require("./permissions.js");

const startServer = async () => {

    const port = 5001;

    //conectare la mongo
    const url = "mongodb://mihai:root@mongodb:27017/employees"
    await mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true});

    //creare server de apollo
    const server = new ApolloServer({
        schema: applyMiddleware(buildFederatedSchema([{typeDefs: typeDefUser, resolvers: resolverUser}]), permissions),
        context: ({req}) => { //definire context cu userul din token decodificat primit din request
            const user = req.headers.user ? JSON.parse(req.headers.user) : null;
            return {user};
        }
    });

    //pornire server
    server.listen({ port }).then(({url}) => {
        console.log(`Users service ready at ${url}!`);
    });
};

startServer();