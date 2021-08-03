const express = require('express');
const cors = require('cors');
const {ApolloServer, AuthenticationError} = require('apollo-server-express');
const {ApolloGateway, RemoteGraphQLDataSource} = require('@apollo/gateway');
const expressJwt = require("express-jwt");

const startServer = async () => {

    const port = 5000;
    const url = "http://localhost:5001";

    const app = express(); //creare server
    app.use(express.json()); //parsare de URL. Stiu ca nu trebuia, dar am zis ca poate e nevoie mai incolo
    app.use(cors());

    //decodare JWT token
    app.use(expressJwt({
        secret: "we_rock",
        algorithms: ["HS256"],
        credentialsRequired: false
    }));

    //creare Apollo Gateway
    const gateway = new ApolloGateway({
        serviceList: [{name: "EandP", url: url}],
        buildService({ name, url }) {
            //trimitere request cu header de Authorization
            return new RemoteGraphQLDataSource({
                url,
                willSendRequest({request, context}) {
                    request.http.headers.set(
                        "user",
                        context.user ? JSON.stringify(context.user) : null
                    )
                }
            });
        }
    });

    const server = new ApolloServer({
        gateway,
        subscription: false,
        context: ({req, _, next}) => { //creare context

            // if (!req.headers.authorization)
            //     throw new AuthenticationError("You must be signed in for this operation!");

            // const token = req.headers.authorization.split(" ")[1];
            const user = req.user || null;
            return {user};
        }
    });

    await server.start();
    server.applyMiddleware({app});

    //pornire gateway
    app.listen({port}, () => {
        console.log("Server is running on http://localhost:5000/graphql !");
    });
};

startServer();