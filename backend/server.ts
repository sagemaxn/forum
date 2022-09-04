const mongoose = require("mongoose");

import * as Express from "express";
import "reflect-metadata";
import { verify } from "jsonwebtoken";
const cookieParser = require("cookie-parser");
const cors = require("cors");

import { ApolloServer } from "apollo-server-express";
const {
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
import { buildSchema, UseMiddleware } from "type-graphql";
import { UserResolver } from "./src/UserResolver";
import { PostResolver } from "./src/PostResolver"
import { UserModel } from "./src/models/User";

require("dotenv").config();

const app = Express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

// const main = async () => {
//   const schema = await buildSchema({
//     resolvers: [UserResolver, PostResolver],
//     //emitSchemaFile: true
//   });
//   const apolloServer = new ApolloServer({
//     schema,
//     context: async ({ req, res }) => {
//       return { res, req, payload: "asd" };
//     },
//   });
//   await apolloServer.start()

//   const corsOptions = {
//       credentials: true,
//       methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//       origin: 'http://localhost:3000',
//     }

//   app.use(cors(corsOptions));

//   apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

//   // apolloServer.applyMiddleware({ app, cors: {
//   //   credentials: true,
//   //   methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   //   origin: 'http://localhost:3000',
//   // } });
//  // app.use(cookieParser());
//   app.listen(4000, () => {
//     console.log("Server started on 4000");
//   });
// };
// main();



  const main = async () => {
      const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver],
        //emitSchemaFile: true
      });
      
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({
        req, res
      }),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    
    });
      await server.start()
    
      var corsOptions = {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
        port: 4000,
        credentials: true,
      };
      app.use(cors(corsOptions));
      app.use(cookieParser())
    
      server.applyMiddleware({ app, path: "/graphql", cors: false });
    
      app.listen(4000, () => {
        console.log("Server started on 4000");
      });
    };
    main();