const express = require('express');
const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server-express');
const {resolvers} = require('./resolvers.js');
const {typeDefs} = require('./typeDefs.js');

const startServer = async () => {
    const app = express(); //creare server
    app.use(express.json()); //parsare de URL. Stiu ca nu trebuia, dar am zis ca poate e nevoie mai incolo

    //conectare la mongo
    const url = "mongodb://mihai:root@localhost:27017/employees"
    await mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false,
        useCreateIndex: true});

    //creare server de apollo
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();
    server.applyMiddleware({ app });

    //pornire server
    app.listen({port: 5000}, () => {
        console.log("Server is running on http://localhost:5000/graphql !");
    });
};

startServer();