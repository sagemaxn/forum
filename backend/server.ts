const mongoose = require("mongoose");
import * as Express from "express";
import "reflect-metadata";
const cookieParser = require("cookie-parser");
const cors = require("cors");
import { expressCspHeader, NONE, SELF } from 'express-csp-header'

import { ApolloServer } from "apollo-server-express";
import { buildSchema, UseMiddleware } from "type-graphql";
import { shouldSendSameSiteNone } from 'should-send-same-site-none'
import { UserResolver } from "./src/UserResolver";
import { PostResolver } from "./src/PostResolver";

require("dotenv").config();

const app = Express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
//       origin: 'http://localhost:3000https://sage-wordle.herokuapp.com/

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
      req,
      res,
    }),
  });
  await server.start();

  // const origin =
  //   process.env.NODE_ENV === "development"
  //     ? "https://sage-wordle.herokuapp.com"
  //     : "http://localhost:3000";

  var corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    port: process.env.PORT || 4000,
    credentials: true,
    
  };

  app.use(expressCspHeader({
    directives: {
        'default-src': [NONE],
        'img-src': [SELF],
    }
}));

  
  app.use(cookieParser());
  app.use(Express.static(".next"));
  app.use(cors(corsOptions));
  app.use(shouldSendSameSiteNone);

  server.applyMiddleware({ app, path: "/graphql", cors: corsOptions, });

  // app.get("/", (req, res) => {
  //   console.log(req);

  //   res.send('hello!')
  // });

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log("Server started on 4000");
  });
};
main();
