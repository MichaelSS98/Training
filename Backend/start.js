const express = require('express');
const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server-express');
const {resolvers} = require('./resolvers.js');
const {typeDefs} = require('./typeDefs.js');

const startServer = async () => {
    const app = express();
    app.use(express.json());

    const url = "mongodb://mihai:root@localhost:27017/employees"
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({port: 5000}, () => {
        console.log("Server is running on url http://localhost:5000/graphql!");
    });
};

startServer();