const mongoose = require("mongoose");

import * as Express from "express";
import "reflect-metadata";
import {verify} from 'jsonwebtoken'
const cookieParser = require('cookie-parser')
const cors = require('cors')

import { ApolloServer } from "apollo-server-express";
import { buildSchema , UseMiddleware } from "type-graphql";
import { UserResolver } from "./UserResolver";
import {UserModel} from './models/User'

require("dotenv").config();

//console.log(process.env.MONGODB_URI);
const app = Express();
  app.use(cookieParser())
  app.use(
    cors({
      origin: 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  function context(ctx) {
    return {
      // expose the cookie helper in the GraphQL context object
      cookie: ctx.res.cookie,
      // allow queries and mutations to look for an `isMe` boolean in the context object
      
    }
  }
  

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

const main = async () => {
  



  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true
  });
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      console.log(req.cookies)
    //  console.log(req.cookies)
    //  req.headers.cookie = req.cookie
    //   const auth = req ? req.headers.authorization : null
    //   if (auth && auth.toLowerCase().startsWith('bearer ')) {
    //     const decodedToken = verify(
    //       auth.substring(7), process.env.JWT_SECRET
    //     )
    //     console.log(decodedToken)
    //     //const currentUser = await UserModel.findById(decodedToken)
    //     //console.log(currentUser)
    //     const payload = decodedToken
      //   return { res, payload }
      // }
      return { res, req, payload: "asd" }
    }
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on 4000");
  });
};
main();
